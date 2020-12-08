// @flow
import * as React from 'react';

import ChatterPyDispatch from '../ChatterPyDispatch';
import ChatsAppDispatch, {
  chatsAppReducer,
  getInitialState,
} from './ChatsAppDispatch';
import ChatHeader from './ChatHeader';
import ChatListSection from './ChatListSection';
import ChatMessagesSection from './ChatMessagesSection';
import ChatService from '../../../services/ChatService';
import useGlobalState from '../useGlobalState';

export default function ChatsApp(): React.Node {
  const [
    localState,
    localDispatch,
    globalState,
  ] = useGlobalState(chatsAppReducer, getInitialState, [
    'allContacts',
    'allConversations',
    'conversationDetailsCache',
  ]);
  const globalDispatch = React.useContext(ChatterPyDispatch);

  const {
    contactsWithConversations,
    allChatEvents,
    selectedChatContact,
    contactSearchString,
    showContactInfoPanel,
  } = localState;

  const { conversationDetailsCache } = globalState;

  const [selectedContact, selectedConversation] = selectedChatContact || [
    undefined,
    undefined,
  ];

  const chatEvents =
    selectedContact === undefined
      ? []
      : allChatEvents.get(selectedContact.id) || [];

  // selected conversation details
  const conversationDetails =
    selectedContact === undefined
      ? undefined
      : conversationDetailsCache.get(selectedContact.id);

  // load the conversation details if necessary
  React.useEffect(() => {
    if (
      selectedConversation &&
      selectedConversation.id !== undefined &&
      chatEvents.length === 0
    ) {
      ChatService.getConversationDetails(selectedConversation.id).then(
        details => {
          console.log('Conversation details', details);
          globalDispatch({
            type: 'CONVERSATION_DETAILS_STORE',
            conversationDetails: details,
          });
        },
      );
    }
  }, [chatEvents, selectedConversation, globalDispatch]);

  // filter the contactsWithConversations list with the search string
  const filteredUsersWithMessages =
    contactSearchString === ''
      ? contactsWithConversations
      : contactsWithConversations.filter(([contact, _]) =>
          `${contact.firstName} ${contact.lastName}`
            .toLowerCase()
            .includes(contactSearchString.toLowerCase()),
        );

  return (
    <ChatsAppDispatch.Provider value={localDispatch}>
      <div className="section__content section__content--user-interface">
        <div className="chats js-chats chats--size1">
          <div className="chats__inner">
            <ChatHeader
              selectedContact={selectedContact}
              conversationDetails={conversationDetails}
            />

            <div className="chats__body" style={{ marginBottom: -65 }}>
              <ChatListSection
                allChatEvents={allChatEvents}
                contactsWithConversations={filteredUsersWithMessages}
                selectedChatContact={selectedContact}
              />
              <ChatMessagesSection
                chatEvents={chatEvents}
                selectedContact={selectedContact}
                conversationId={
                  selectedConversation ? selectedConversation.id : undefined
                }
                showContactInfoPanel={showContactInfoPanel}
                conversationDetails={conversationDetails}
              />
            </div>
          </div>
        </div>
      </div>
    </ChatsAppDispatch.Provider>
  );
}
