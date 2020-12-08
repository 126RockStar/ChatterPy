// @flow
import * as React from 'react';
import ChatterPyImages from '../../../../helpers/ChatterPyImages';
import newChatIcon from '../../../../assets/images/temp/ico-new-chat.png';
import ChatsAppDispatch from '../ChatsAppDispatch';
import NewConversationModal from './NewConversationModal';

export default function ChatListHeader(): React.Element<'div'> {
  const dispatch = React.useContext(ChatsAppDispatch);
  const [searchStr, setSearchStr] = React.useState('');
  const [showNewMessageModal, setShowNewMessageModal] = React.useState(false);
  const onNewMessageClick = React.useCallback(
    () => setShowNewMessageModal(true),
    [],
  );
  const onCloseNewMessageModal = React.useCallback(
    () => setShowNewMessageModal(false),
    [],
  );

  const onSearchChange = e => {
    const val = e.currentTarget.value;
    setSearchStr(val);
    dispatch({ type: 'SEARCH_CHANGE', searchStr: val });
  };

  React.useEffect(() => {
    const headerNewChatIcon = document.getElementById('header--new-chat-icon');
    if (headerNewChatIcon) {
      headerNewChatIcon.addEventListener('click', onNewMessageClick);
    }

    return () => {
      if (headerNewChatIcon) {
        headerNewChatIcon.removeEventListener('click', onNewMessageClick);
      }
    };
  }, [onNewMessageClick]);

  return (
    <div className="chats__head-search">
      <div className="search visible-xs-block hidden">
        <form action="?" method="get">
          <label htmlFor="search-1" className="hidden">
            Search
          </label>
          <input
            type="search"
            name="search-1"
            id="search-1"
            value={searchStr}
            placeholder="Search"
            className="search__field"
            onChange={onSearchChange}
          />
          <img
            src={ChatterPyImages.Icons.search}
            alt=""
            width="25"
            height="24"
          />
        </form>
      </div>

      <ul>
        <li>
          <a href="/#">Me</a>
        </li>

        <li>
          <a href="/#">Open</a>
        </li>

        <li>
          <a href="/#">All</a>
        </li>
      </ul>

      <div
        role="button"
        className="link-add-new hidden-xs"
        onClick={onNewMessageClick}
      >
        <img src={newChatIcon} alt="" width="27" height="27" />
      </div>

      <div className="search hidden-xs">
        <label htmlFor="search-2" className="hidden">
          Search
        </label>
        <input
          type="search"
          name="search-2"
          id="search-2"
          value={searchStr}
          placeholder="Search"
          className="search__field"
          onChange={onSearchChange}
        />
        <img src={ChatterPyImages.Icons.search} alt="" width="20" height="20" />
      </div>
      {showNewMessageModal && (
        <NewConversationModal onRequestClose={onCloseNewMessageModal} />
      )}
    </div>
  );
}
