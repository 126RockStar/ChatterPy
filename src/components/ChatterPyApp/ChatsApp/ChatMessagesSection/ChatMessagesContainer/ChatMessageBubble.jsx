// @flow
import * as React from 'react';

import ChatterPyContext from '../../../ChatterPyContext';
import type { ChatMessage } from '../../../types';

type Props = {
  message: ChatMessage,
};

export default function ChatMessageBubble({
  message,
}: Props): React.Element<'div'> {
  const { allUsers } = React.useContext(ChatterPyContext);
  const { messageType, contents, sender, timestamp } = message;
  const timestampStr = timestamp.format('HH:MM A DD/MM/YYYY');

  const user = React.useMemo(
    () => allUsers.find(u => u.id === message.sentFromUserId),
    [allUsers, message.sentFromUserId],
  );

  switch (messageType) {
    case 'SENT':
      return (
        <div className="chats__row">
          <div className="chats__row-inner">
            <em>{user ? user.fullDisplayName : sender}</em>
            <p style={{whiteSpace:'pre-wrap', textAlign:'left'}}>{contents}</p>
            <span>{timestampStr}</span>
          </div>
        </div>
      );
    case 'RECEIVED':
      return (
        <div className="chats__row chats__row--person">
          <div className="chats__row-inner">
            <em>{sender}</em>
            <p p style={{whiteSpace:'pre-wrap', textAlign:'left'}}>{contents}</p>
            <span>{timestampStr}</span>
          </div>
        </div>
      );
    case 'PRIVATE':
      return (
        <div className="chats__private-message">
          <em>{sender}</em>
          <p p style={{whiteSpace:'pre-wrap', textAlign:'left'}}>{contents}</p>
          <span>{timestampStr}</span>
        </div>
      );
    default:
      throw new Error(`Invalid message type received: ${messageType}`);
  }
}
