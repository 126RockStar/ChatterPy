// @flow
import * as React from 'react';

import ChatMessageBubble from './ChatMessageBubble';
import ChatOwnerChangeBubble from './ChatOwnerChangeBubble';
import ChatStatusChangeBubble from './ChatStatusChangeBubble';
import type { ChatEvent } from '../../../types';

type Props = {
  chatEvents: $ReadOnlyArray<ChatEvent>,
  desktopNodeRef?: { current: ?HTMLDivElement },
  mobileNodeRef?: { current: ?HTMLDivElement },
};

export default function ChatMessagesContainer({
  chatEvents,
  desktopNodeRef,
  mobileNodeRef,
}: Props): React.Node {
  const bubbles = chatEvents.map(event => {
    const key = event.timestamp.valueOf();
    switch (event.type) {
      case 'MESSAGE':
        return <ChatMessageBubble key={key} message={event} />;
      case 'STATUS_CHANGE':
        return <ChatStatusChangeBubble key={key} statusChange={event} />;
      case 'OWNER_CHANGE':
        return <ChatOwnerChangeBubble key={key} ownerChange={event} />;
      default:
        throw new Error(`Invalid message type received: '${event.type}'`);
    }
  });

  const desktopView = (
    <div
      style={{ overflowY: 'scroll' }}
      className="chats__chat-field hidden-xs"
      ref={desktopNodeRef}
    >
      <div className="chats__chat-field-inner">{bubbles}</div>
    </div>
  );

  const mobileView = (
    <div
      className="chats__chat-field hidden visible-xs-block"
      style={{ overflowY: 'scroll' }}
      ref={mobileNodeRef}
    >
      <div className="chats__chat-field-inner">
        {bubbles.map(content => (
          <div key={content.key} style={{ paddingBottom: 16 }}>
            {content}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {desktopView}
      {mobileView}
    </>
  );
}
