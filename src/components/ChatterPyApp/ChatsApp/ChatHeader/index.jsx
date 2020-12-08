// @flow
import * as React from 'react';

import ChatConversationHeader from './ChatConversationHeader';
import ChatListHeader from './ChatListHeader';
import type { Contact, ConversationDetails } from '../../types';

type Props = {
  conversationDetails: ConversationDetails | void,
  selectedContact: Contact | void,
};

export default function ChatHeader({
  conversationDetails,
  selectedContact,
}: Props): React.Element<'div'> {
  return (
    <div className="chats__head">
      <ChatListHeader />
      {selectedContact !== undefined && conversationDetails !== undefined ? (
        <ChatConversationHeader
          key={selectedContact.id}
          selectedContactForChat={selectedContact}
          conversationDetails={conversationDetails}
        />
      ) : null}
    </div>
  );
}
