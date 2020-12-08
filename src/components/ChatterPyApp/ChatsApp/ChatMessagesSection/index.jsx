// @flow
import * as React from 'react';
import classNames from 'classnames';

import ChatsAppDispatch from '../ChatsAppDispatch';
import ChatConversationHeader from '../ChatHeader/ChatConversationHeader';
import ChatMessagesContainer from './ChatMessagesContainer';
import ContactInfoPanel from './ContactInfoPanel';
import MessageComposer from './MessageComposer';
import PrivateMessageComposer from './PrivateMessageComposer';
import usePrevious from '../../../../utils/usePrevious';
import useWindowResizeListener from '../../../../utils/useWindowResizeListener';
import type {
  ChatEvent,
  Contact,
  ConversationDetails,
  ConversationId,
} from '../../types';

type Props = {
  chatEvents: $ReadOnlyArray<ChatEvent>,
  conversationId: ConversationId | void,
  conversationDetails: ConversationDetails | void,
  selectedContact: Contact | void,
  showContactInfoPanel: boolean,
};

export default function ChatMessagesSection({
  chatEvents,
  conversationId,
  conversationDetails,
  selectedContact,
  showContactInfoPanel,
}: Props): React.Node {
  const localDispatch = React.useContext(ChatsAppDispatch);
  const prevChatEvents = usePrevious(chatEvents);
  const [showPMComposer, setShowPMComposer] = React.useState(false);
  const togglePMComposer = () => setShowPMComposer(prev => !prev);

  // set up necessary refs for desktop view
  const desktopContactInfoPanelRef = React.useRef();
  const desktopMessagesContainerRef = React.useRef();
  const desktopMessageComposerRef = React.useRef();
  const desktopPMComposerRef = React.useRef();

  // set up necessary refs for mobile view
  const mobileContactInfoPanelRef = React.useRef();
  const mobileMessagesContainerRef = React.useRef();
  const mobileMessageComposerRef = React.useRef();
  const mobilePMComposerRef = React.useRef();

  const setChatMessageContainerHeight = (
    contactInfoPanelRef,
    messagesContainerRef,
    messageComposerRef,
    pmComposerRef,
  ) => {
    const messageComposerHeight = messageComposerRef.current
      ? messageComposerRef.current.offsetHeight
      : 0;
    const pmComposerHeight = pmComposerRef.current
      ? pmComposerRef.current.offsetHeight
      : 0;

    if (messagesContainerRef.current) {
      const chatContainerElt = messagesContainerRef.current;
      const { top } = chatContainerElt.getBoundingClientRect();
      const topOfContainer = window.scrollY + top;

      const calcHeight =
        window.innerHeight -
        topOfContainer -
        messageComposerHeight -
        pmComposerHeight;

      chatContainerElt.style.height = `${calcHeight}px`;

      if (contactInfoPanelRef.current) {
        const contactInfoElt = contactInfoPanelRef.current;
        contactInfoElt.style.height = `${calcHeight}px`;
      }
    }
  };

  const setContainerHeights = () => {
    setChatMessageContainerHeight(
      desktopContactInfoPanelRef,
      desktopMessagesContainerRef,
      desktopMessageComposerRef,
      desktopPMComposerRef,
    );

    setChatMessageContainerHeight(
      mobileContactInfoPanelRef,
      mobileMessagesContainerRef,
      mobileMessageComposerRef,
      mobilePMComposerRef,
    );
  };

  // ensure that the height of the ChatMessagesContainer is always correctly
  // set to avoid it from expanding the viewport vertically
  React.useLayoutEffect(() => {
    setContainerHeights();
  });
  useWindowResizeListener(setContainerHeights);

  // scroll to the newest message if there are new chatEvents
  React.useLayoutEffect(() => {
    if (
      prevChatEvents === undefined ||
      (prevChatEvents && prevChatEvents.length !== chatEvents.length)
    ) {
      // for desktop
      if (desktopMessagesContainerRef.current) {
        const messagesContainerElt = desktopMessagesContainerRef.current;
        const height = messagesContainerElt.offsetHeight;
        const newScrollY = messagesContainerElt.scrollHeight - height;
        messagesContainerElt.scrollTop = newScrollY;
      }

      // for mobile
      if (mobileMessagesContainerRef.current) {
        const messagesContainerElt = mobileMessagesContainerRef.current;
        const height = messagesContainerElt.offsetHeight;
        const newScrollY = messagesContainerElt.scrollHeight - height;
        messagesContainerElt.scrollTop = newScrollY;
      }
    }
  });

  const desktopView = (
    <div className="chats__content chats__content--private hidden-xs">
      {conversationId !== undefined && selectedContact !== undefined ? (
        <>
          <div style={{ display: 'flex' }}>
            <ChatMessagesContainer
              chatEvents={chatEvents}
              desktopNodeRef={desktopMessagesContainerRef}
            />
            <ContactInfoPanel
              show={showContactInfoPanel}
              nodeRef={desktopContactInfoPanelRef}
              onRequestClose={() =>
                localDispatch({ type: 'CONTACT_INFO_PANEL_TOGGLE' })
              }
              contact={selectedContact}
            />
          </div>
          {showPMComposer && (
            <PrivateMessageComposer
              onRequestClose={() => setShowPMComposer(false)}
              recipient={selectedContact}
              nodeRef={desktopPMComposerRef}
            />
          )}
          <MessageComposer
            onTogglePMComposer={togglePMComposer}
            recipient={selectedContact}
            nodeRef={desktopMessageComposerRef}
            conversationId={conversationId}
          />
        </>
      ) : null}
    </div>
  );

  const mobileClassName = classNames(
    'chats__content-container-fixed js-chat-content hidden visible-xs-block',
    {
      'is-active': selectedContact !== undefined,
    },
  );

  const mobileView = (
    <div className={mobileClassName}>
      <div className="chats__content chats__content--fixed">
        {conversationId !== undefined &&
        selectedContact !== undefined &&
        conversationDetails !== undefined ? (
          <>
            <ChatConversationHeader
              selectedContactForChat={selectedContact}
              conversationDetails={conversationDetails}
            />
            <ChatMessagesContainer
              chatEvents={chatEvents}
              mobileNodeRef={mobileMessagesContainerRef}
            />
            {showPMComposer && (
              <PrivateMessageComposer
                onRequestClose={() => setShowPMComposer(false)}
                recipient={selectedContact}
                nodeRef={mobilePMComposerRef}
              />
            )}
            <MessageComposer
              onTogglePMComposer={togglePMComposer}
              recipient={selectedContact}
              nodeRef={mobileMessageComposerRef}
              conversationId={conversationId}
            />
            <ContactInfoPanel
              show={showContactInfoPanel}
              onRequestClose={() =>
                localDispatch({ type: 'CONTACT_INFO_PANEL_TOGGLE' })
              }
              contact={selectedContact}
              nodeRef={mobileContactInfoPanelRef}
            />
          </>
        ) : null}
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
