// @flow
import * as React from 'react';

import type {
  Automation,
  Contact,
  ContactId,
  Conversation,
  ConversationDetails,
  ChatMessage,
  User,
  ChatOwnerAssignment,
  ChatStatusUpdate,
  Datasource,
  PhoneNumber,
  Template,
} from './types';

export type ChatterPyState = {
  allAutomations: $ReadOnlyArray<Automation>,
  allContacts: $ReadOnlyArray<Contact>,
  allConversations: $ReadOnlyArray<Conversation>,
  allDatasources: $ReadOnlyArray<Datasource>,
  allUsers: $ReadOnlyArray<User>,
  allPhoneNumbers: $ReadOnlyArray<PhoneNumber>,
  allTemplates: $ReadOnlyArray<Template>,
  conversationDetailsCache: $ReadOnlyMap<ContactId, ConversationDetails>,
  selectedPhoneNumber: PhoneNumber | void,
};

export const INITIAL_STATE: ChatterPyState = {
  allAutomations: [],
  allDatasources: [],
  allContacts: [],
  allConversations: [],
  allUsers: [],
  allPhoneNumbers: [],
  allTemplates: [],
  conversationDetailsCache: new Map(),
  selectedPhoneNumber: undefined,
};

type ChatterPyAction =
  | {
      type: 'AUTOMATIONS_SET',
      allAutomations: $ReadOnlyArray<Automation>,
    }
  | {
      type: 'AUTOMATION_ADD',
      automation: Automation,
    }
  | {
      type: 'CONTACT_ADD',
      contact: Contact,
    }
  | {
      type: 'CONTACT_DELETE',
      contactId: number,
    }
  | {
      type: 'CONTACTS_SET',
      allContacts: $ReadOnlyArray<Contact>,
    }
  | {
      type: 'CONVERSATION_ADD',
      conversation: Conversation,
    }
  | {
      type: 'CONVERSATIONS_SET',
      allConversations: $ReadOnlyArray<Conversation>,
    }
  | {
      /** Add a ConversationDetails object to the cache */
      type: 'CONVERSATION_DETAILS_STORE',
      conversationDetails: ConversationDetails,
    }
  | {
      type: 'DATASOURCES_SET',
      allDatasources: $ReadOnlyArray<Datasource>,
    }
  | {
      type: 'MESSAGE_SEND',
      message: ChatMessage,
      recipientContactId: ContactId,
    }
  | {
      type: 'CHAT_STATUS_CHANGE',
      contactId: ContactId,
      statusUpdate: ChatStatusUpdate,
    }
  | {
      type: 'CHAT_ASSIGNMENT_CHANGE',
      contactId: ContactId,
      ownerAssignment: ChatOwnerAssignment,
    }
  | {
      type: 'USERS_SET',
      allUsers: $ReadOnlyArray<User>,
    }
  | {
      type: 'PHONE_NUMBERS_SET',
      allPhoneNumbers: $ReadOnlyArray<PhoneNumber>,
    }
  | {
      type: 'PHONE_NUMBER_SELECT',
      selectedPhoneNumber: string,
    }
  | {
      type: 'TEMPLATES_SET',
      allTemplates: $ReadOnlyArray<Template>,
    }
  | {
      type: 'TEMPLATE_ADD',
      template: Template,
    };

export function chatterpyReducer(
  state: ChatterPyState,
  action: ChatterPyAction,
): ChatterPyState {
  const {
    allAutomations,
    allContacts,
    allConversations,
    allPhoneNumbers,
    allTemplates,
    conversationDetailsCache,
    selectedPhoneNumber,
  } = state;

  switch (action.type) {
    case 'AUTOMATIONS_SET':
      return {
        ...state,
        allAutomations: action.allAutomations,
      };
    case 'AUTOMATION_ADD':
      return {
        ...state,
        allAutomations: allAutomations.concat(action.automation),
      };
    case 'CONTACT_ADD':
      return {
        ...state,
        allContacts: allContacts.concat(action.contact),
      };
    case 'CONTACT_DELETE':
      return {
        ...state,
        allContacts: allContacts.filter(c => c.id !== action.contactId),
      };
    case 'CONTACTS_SET':
      return {
        ...state,
        allContacts: action.allContacts,
      };
    case 'CONVERSATION_ADD':
      return {
        ...state,
        allConversations: allConversations.concat(action.conversation),
      };
    case 'CONVERSATIONS_SET':
      return {
        ...state,
        allConversations: action.allConversations,
      };
    case 'CONVERSATION_DETAILS_STORE':
      return {
        ...state,
        conversationDetailsCache: new Map([
          ...conversationDetailsCache.entries(),
        ]).set(
          action.conversationDetails.contactId,
          action.conversationDetails,
        ),
      };
    case 'MESSAGE_SEND':
      const conversationDetails = conversationDetailsCache.get(
        action.recipientContactId,
      );
      const newCache =
        conversationDetails === undefined
          ? conversationDetailsCache
          : new Map(conversationDetailsCache.entries()).set(
              action.recipientContactId,
              {
                ...conversationDetails,
                messages: conversationDetails.messages.concat(action.message),
              },
            );

      const newConversations = allConversations.map(conversation => {
        if (conversation.contactId === action.recipientContactId) {
          return {
            ...conversation,
            newestMessage: action.message.contents,
            newestTime: action.message.timestamp,
          };
        }

        return conversation;
      });

      return {
        ...state,
        allConversations: newConversations,
        conversationDetailsCache: newCache,
      };

    case 'CHAT_STATUS_CHANGE': {
      const conversationDetails = conversationDetailsCache.get(
        action.contactId,
      );

      if (conversationDetails) {
        const newCache = new Map(conversationDetailsCache.entries());
        return {
          ...state,
          conversationDetailsCache: newCache.set(action.contactId, {
            ...conversationDetails,
            statusUpdates: conversationDetails.statusUpdates.concat(
              action.statusUpdate,
            ),
          }),
        };
      }

      return state;
    }

    case 'CHAT_ASSIGNMENT_CHANGE': {
      const conversationDetails = conversationDetailsCache.get(
        action.contactId,
      );

      if (conversationDetails) {
        const newCache = new Map(conversationDetailsCache.entries());
        return {
          ...state,
          conversationDetailsCache: newCache.set(action.contactId, {
            ...conversationDetails,
            assignments: conversationDetails.assignments.concat(
              action.ownerAssignment,
            ),
          }),
        };
      }

      return state;
    }

    case 'USERS_SET':
      return {
        ...state,
        allUsers: action.allUsers,
      };

    case 'PHONE_NUMBERS_SET': {
      const firstNumber = action.allPhoneNumbers[0];
      return {
        ...state,
        allPhoneNumbers: action.allPhoneNumbers,
        selectedPhoneNumber: selectedPhoneNumber
          ? action.allPhoneNumbers.find(
              p => p.phoneNumber === selectedPhoneNumber.phoneNumber,
            ) || firstNumber
          : firstNumber,
      };
    }

    case 'PHONE_NUMBER_SELECT': {
      const phoneNumber = allPhoneNumbers.find(
        p => p.phoneNumber === action.selectedPhoneNumber,
      );
      return {
        ...state,
        selectedPhoneNumber: phoneNumber,
      };
    }

    case 'TEMPLATE_ADD': {
      return {
        ...state,
        allTemplates: allTemplates.concat(action.template),
      };
    }

    case 'TEMPLATES_SET': {
      return {
        ...state,
        allTemplates: action.allTemplates,
      };
    }

    case 'DATASOURCES_SET': {
      return {
        ...state,
        allDatasources: action.allDatasources,
      };
    }

    default: {
      // eslint-disable-next-line no-unused-expressions
      (action.type: empty);
      throw new Error(`Invalid action type received: '${action.type}`);
    }
  }
}

export default (React.createContext(() => undefined): React.Context<
  (ChatterPyAction) => void,
>);
