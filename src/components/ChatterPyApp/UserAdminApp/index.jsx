// @flow
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import SearchInput from './SearchInput';
import UserTable from './UserTable';
import useJQueryTabs from '../ui/useJQueryTabs';
import UserAdminDispatch, {
  INITIAL_STATE,
  appReducer,
} from './UserAdminDispatch';

export default function UserAdminApp(): React.Node {
  const [appState, dispatch] = React.useReducer(appReducer, INITIAL_STATE);
  const { allPendingUsers, visibleUsers, visiblePendingUsers } = appState;

  const [userSearchText, setUserSearchText] = React.useState('');
  const [pendingUserSearchText, setPendingUserSearchText] = React.useState('');
  useJQueryTabs();

  const onUserSearchChange = searchText => {
    setUserSearchText(searchText);
    dispatch({ searchText, type: 'USER_SEARCH' });
  };

  const onPendingUserSearchChange = searchText => {
    setPendingUserSearchText(searchText);
    dispatch({ searchText, type: 'PENDING_USER_SEARCH' });
  };

  return (
    <UserAdminDispatch.Provider value={dispatch}>
      <div className="section__content">
        <div className="section__content-head section__content-head--alt">
          <h3>Manage Users</h3>
          <NavLink to="/app/admin/invite-user">Invite a user</NavLink>
        </div>

        <div className="section__content-body">
          <div className="tabs tabs--alt js-tabs">
            <div className="tabs__head">
              <nav className="tabs__nav">
                <ul>
                  <li className="is-current">
                    <a href="#tab-1">Active</a>
                  </li>

                  <li>
                    <a href="#tab-2">Pending ({allPendingUsers.length})</a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="tabs__body">
              <div className="tab is-current translating-in" id="tab-1">
                <div className="tabs__utilities tabs__utilities--alt">
                  <div className="tab__search">
                    <SearchInput
                      name="search"
                      value={userSearchText}
                      onChange={onUserSearchChange}
                    />
                  </div>
                </div>

                <div className="tab__inner">
                  <UserTable users={visibleUsers} userType="ACTIVE" />
                </div>
              </div>

              <div className="tab" id="tab-2">
                <div className="tabs__utilities tabs__utilities--alt">
                  <div className="tab__search">
                    <SearchInput
                      name="search-2"
                      value={pendingUserSearchText}
                      onChange={onPendingUserSearchChange}
                    />
                  </div>
                </div>

                <div className="tab__inner">
                  <UserTable users={visiblePendingUsers} userType="PENDING" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserAdminDispatch.Provider>
  );
}
