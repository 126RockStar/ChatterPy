// @flow
import * as React from 'react';

import { sortDate } from '../../../utils/dateUtil';
import type { Conversation, Contact, ContactId, ChatEvent } from '../types';
import type { ChatterPyState } from '../ChatterPyDispatch';

type ChatsAppState = {
  /**
   * A map of all contact ids to their chat event history with the active contact
   */
  allChatEvents: $ReadOnlyMap<ContactId, $ReadOnlyArray<ChatEvent>>,

  /** An array of all contacts who have messages with the active contact */
  contactsWithConversations: $ReadOnlyArray<[Contact, Conversation]>,

  /** The search string to filter the contact list with */
  contactSearchString: string,

  /** The contact/conversation tuple we have selected to chat with */
  selectedChatContact: [Contact, Conversation] | void,

  showContactInfoPanel: boolean,
};

type ChatsAction =
  /** Select a new contact to chat with */
  | {
      type: 'CHAT_CONTACT_SELECT',
      contact: Contact,
    }
  | {
      type: 'CHAT_USER_DESELECT',
    }
  | {
      type: 'SEARCH_CHANGE',
      searchStr: string,
    }
  | { type: 'CONTACT_INFO_PANEL_TOGGLE' }
  | { type: 'STATE_RESET', globalState: ChatterPyState };

export function getInitialState(globalState: ChatterPyState): ChatsAppState {
  const {
    allContacts,
    allConversations,
    conversationDetailsCache,
  } = globalState;

  const contactIdToContact = allContacts.reduce(
    (map, contact) => map.set(contact.id, contact),
    new Map<number, Contact>(),
  );
  const contactIdToConversation = allConversations.reduce(
    (map, conv) => map.set(conv.contactId, conv),
    new Map<number, Conversation>(),
  );
  const contactsWithConversations = [...contactIdToConversation.keys()]
    .map(id => {
      const contact = contactIdToContact.get(id);
      const conversation = contactIdToConversation.get(id);
      if (contact && conversation) {
        return [contact, conversation];
      }
      return undefined;
    })
    .filter(Boolean)
    .sort(([, conv1], [, conv2]) =>
      sortDate(conv1.newestTime, conv2.newestTime, 'DESC'),
    );

  const allChatEvents = [...conversationDetailsCache.values()].reduce(
    (map, conversationDetails) => {
      const { statusUpdates, messages, assignments } = conversationDetails;
      const events = statusUpdates
        .concat(assignments)
        .concat(messages)
        .sort((ev1, ev2) => sortDate(ev1.timestamp, ev2.timestamp));
      return map.set(conversationDetails.contactId, events);
    },
    new Map<ContactId, $ReadOnlyArray<ChatEvent>>(),
  );

  return {
    allChatEvents,
    contactsWithConversations,
    selectedChatContact: undefined,
    contactSearchString: '',
    showContactInfoPanel: false,
  };
}

export function chatsAppReducer(
  state: ChatsAppState,
  action: ChatsAction,
): ChatsAppState {
  const {
    contactsWithConversations,
    selectedChatContact,
    contactSearchString,
    showContactInfoPanel,
  } = state;
  switch (action.type) {
    case 'CHAT_CONTACT_SELECT': {
      const contactTuple = contactsWithConversations.find(
        ([contact]) => contact.id === action.contact.id,
      );
      return {
        ...state,
        selectedChatContact: contactTuple,
      };
    }
    case 'SEARCH_CHANGE':
      return {
        ...state,
        contactSearchString: action.searchStr,
      };

    case 'CONTACT_INFO_PANEL_TOGGLE':
      return {
        ...state,
        showContactInfoPanel: !state.showContactInfoPanel,
      };

    case 'CHAT_USER_DESELECT':
      return {
        ...state,
        selectedChatContact: undefined,
      };
    case 'STATE_RESET':
      return {
        ...getInitialState(action.globalState),
        selectedChatContact,
        contactSearchString,
        showContactInfoPanel,
      };
    default: {
      // eslint-disable-next-line no-unused-expressions
      (action.type: empty);
      throw new Error(`Invalid action type: '${action.type}'`);
    }
  }
}

export default (React.createContext(() => undefined): React.Context<
  (ChatsAction) => void,
>);
