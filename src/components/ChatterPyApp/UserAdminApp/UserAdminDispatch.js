// @flow
import * as React from 'react';

import searchObjects from '../../../utils/searchObjects';
import { ALL_USERS, PENDING_USERS } from '../seedData';
import type { LegacyUser } from '../types';

type UserAdminState = {
  allUsers: $ReadOnlyArray<LegacyUser>,
  allPendingUsers: $ReadOnlyArray<LegacyUser>,
  visibleUsers: $ReadOnlyArray<LegacyUser>,
  visiblePendingUsers: $ReadOnlyArray<LegacyUser>,
};

type UserAdminAction =
  | {
      type: 'USER_DELETE',
      user: LegacyUser,
    }
  | {
      type: 'USER_SEARCH',
      searchText: string,
    }
  | { type: 'PENDING_USER_DELETE', user: LegacyUser }
  | {
      type: 'PENDING_USER_SEARCH',
      searchText: string,
    };
export const INITIAL_STATE = {
  allUsers: ALL_USERS,
  allPendingUsers: PENDING_USERS,
  visibleUsers: ALL_USERS,
  visiblePendingUsers: PENDING_USERS,
};

export function appReducer(
  state: UserAdminState,
  action: UserAdminAction,
): UserAdminState {
  const {
    allUsers,
    allPendingUsers,
    visibleUsers,
    visiblePendingUsers,
  } = state;

  switch (action.type) {
    case 'USER_DELETE':
      return {
        ...state,
        allUsers: allUsers.filter(u => u.id !== action.user.id),
        visibleUsers: visibleUsers.filter(u => u.id !== action.user.id),
      };
    case 'PENDING_USER_DELETE':
      return {
        ...state,
        allPendingUsers: allPendingUsers.filter(u => u.id !== action.user.id),
        visiblePendingUsers: visiblePendingUsers.filter(
          u => u.id !== action.user.id,
        ),
      };
    case 'USER_SEARCH':
      return {
        ...state,
        visibleUsers: searchObjects(action.searchText, allUsers, [
          'fullName',
          'role',
          'email',
        ]),
      };
    case 'PENDING_USER_SEARCH':
      return {
        ...state,
        visiblePendingUsers: searchObjects(action.searchText, allPendingUsers, [
          'fullName',
          'role',
          'email',
        ]),
      };
    default: {
      // eslint-disable-next-line no-unused-expressions
      (action.type: empty);
      throw new Error(`Invalid action type received: '${action.type}'`);
    }
  }
}

export default (React.createContext(() => undefined): React.Context<
  (UserAdminAction) => void,
>);
