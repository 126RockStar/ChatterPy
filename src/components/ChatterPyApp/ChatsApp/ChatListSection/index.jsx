// @flow
import * as React from 'react';

import ChatListContact from './ChatListContact';
import useWindowResizeListener from '../../../../utils/useWindowResizeListener';
import type { ChatEvent, Contact, ContactId, Conversation } from '../../types';
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  /**
   * A map of all user ids to their chat event history with the active user
   */
  allChatEvents: $ReadOnlyMap<ContactId, $ReadOnlyArray<ChatEvent>>,

  /** The user the active user has selected to chat with */
  selectedChatContact: Contact | void,

  /** An array of all users who have messages with the active user */
  contactsWithConversations: $ReadOnlyArray<[Contact, Conversation]>,
};

export default function ChatListSection({
  allChatEvents,
  selectedChatContact,
  contactsWithConversations,
}: Props): React.Node {
  const [desktopChatListHeight, setDesktopChatListHeight] = React.useState(
    undefined,
  );
  const [mobileChatListHeight, setMobileChatListHeight] = React.useState(
    undefined,
  );

  const [infiniteScrollUsers, setInfinieScrollUsers] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(false);

  const desktopChatListRef = React.useRef();
  const mobileChatListRef = React.useRef();

  React.useEffect(()=>{
    let filterUsers = contactsWithConversations.filter((item, index)=>index<5);
    console.log('filterusers1', contactsWithConversations );
    if (contactsWithConversations.length>5) {
      setHasMore(true);
    }
    setInfinieScrollUsers(filterUsers);
  }, [contactsWithConversations])

  const setChatListHeights = React.useCallback(() => {
    if (desktopChatListRef.current) {
      const { top } = desktopChatListRef.current.getBoundingClientRect();
      const topOfContainer = window.scrollY + top;
      setDesktopChatListHeight(window.innerHeight - topOfContainer);
    }

    if (mobileChatListRef.current) {
      const { top } = mobileChatListRef.current.getBoundingClientRect();
      const topOfContainer = window.scrollY + top;
      setMobileChatListHeight(window.innerHeight - topOfContainer);
    }
  }, []);

  // set the exact height of the sidebar so that it can be internally scrollable
  // and not extend the viewport vertically
  React.useLayoutEffect(() => {
    setChatListHeights();
  });
  useWindowResizeListener(setChatListHeights);

  const chats = contactsWithConversations.map(([contact, conversation]) => {
    const lastMessageContents = conversation.newestMessage || '';
    return (
      <ChatListContact
        key={contact.id}
        contact={contact}
        lastMessageContents={lastMessageContents}
        lastMessageTime={conversation.newestTime}
        isActiveChat={
          selectedChatContact !== undefined &&
          selectedChatContact.id === contact.id
        }
        conversationId={conversation.id}
      />
    );
  });

  const desktopView = (
    <div className="chats__sidebar hidden-xs">
      <div
        ref={desktopChatListRef}
        style={{
          paddingBottom: 20,
          overflowY: 'scroll',
          height: desktopChatListHeight,
        }}
      >
        {chats}
      </div>
    </div>
  );

  const mobileView = (
    <div className="chats__container hidden visible-xs-block">
      <div
        ref={mobileChatListRef}
        style={{
          marginBottom: 50,
          overflowY: 'scroll',
          height: mobileChatListHeight,
        }}
      >
        {chats}
      </div>
    </div>
  );
  
  const fetchMoreData = () => {
    setTimeout(() => {
      let filterUsers = contactsWithConversations.filter((item, index)=>index>=infiniteScrollUsers.length&&index<2*infiniteScrollUsers.length);
      if (filterUsers.length<5) {
        setHasMore(false);
      }
      let newUsers = [...infiniteScrollUsers, ...filterUsers];
      console.log('newUsers', filterUsers);
      setInfinieScrollUsers(newUsers);
    }, 500);
  }

  return (
    <>
      <div className={`chats__sidebar hidden-xs`}>
        <div
          id="scrollableDiv"
          style={{
            height: 480,
            overflowY: 'scroll',
            display: 'flex',
          }}
        >
            <InfiniteScroll
              dataLength={infiniteScrollUsers.length}
              next={fetchMoreData}
              hasMore={hasMore}
              scrollableTarget="scrollableDiv"
            >
              {
                infiniteScrollUsers&&infiniteScrollUsers.map(([contact, conversation]) => {
                  const lastMessageContents = conversation.newestMessage || '';
                  return (
                    <ChatListContact
                      key={contact.id}
                      contact={contact}
                      lastMessageContents={lastMessageContents}
                      lastMessageTime={conversation.newestTime}
                      isActiveChat={
                        selectedChatContact !== undefined &&
                        selectedChatContact.id === contact.id
                      }
                      conversationId={conversation.id}
                    />
                  );
                })
              } 
            </InfiniteScroll>            
            </div>
            {
              hasMore?<h4 style={{textAlign:'center'}}>Loading...</h4>:null
            }
        </div>
      {mobileView}
    </>
  );
}
