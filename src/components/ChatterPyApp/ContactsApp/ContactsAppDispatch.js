// @flow
import * as React from 'react';

import searchObjects from '../../../utils/searchObjects';
import type { Contact, LegacyContactGroup } from '../types';

type InitArgs = {
  allContacts: $ReadOnlyArray<Contact>,
};

type ContactsAppState = {
  allContacts: $ReadOnlyArray<Contact>,
  allGroups: $ReadOnlyArray<LegacyContactGroup>,
  visibleContacts: $ReadOnlyArray<Contact>,
  visibleGroups: $ReadOnlyArray<LegacyContactGroup>,
};

type ContactsAppAction =
  | {
      type: 'CONTACT_SEARCH',
      searchText: string,
    }
  | {
      type: 'GROUP_DELETE',
      group: LegacyContactGroup,
    }
  | {
      type: 'GROUP_SEARCH',
      searchText: string,
    }
  | {
      type: 'STATE_RESET',
      initArgs: InitArgs,
    };

export function contactsAppReducer(
  state: ContactsAppState,
  action: ContactsAppAction,
): ContactsAppState {
  const { allContacts, allGroups, visibleGroups } = state;
  switch (action.type) {
    case 'CONTACT_SEARCH':
      return {
        ...state,
        visibleContacts: searchObjects(action.searchText, allContacts, [
          'firstName',
          'lastName',
          'phoneNumber',
        ]),
      };
    case 'GROUP_DELETE': {
      const ifGroupShouldBeKept = group => group.id !== action.group.id;
      return {
        ...state,
        allGroups: allGroups.filter(ifGroupShouldBeKept),

        // remember to also filter out of the visible contacts in case we
        // were in the middle of a search
        visibleGroups: visibleGroups.filter(ifGroupShouldBeKept),
      };
    }
    case 'GROUP_SEARCH':
      return {
        ...state,
        visibleGroups: searchObjects(action.searchText, allGroups, [
          'groupName',
        ]),
      };
    case 'STATE_RESET': {
      const { initArgs } = action;
      return {
        ...state,
        allContacts: initArgs.allContacts,
        visibleContacts: initArgs.allContacts,
      };
    }
    default: {
      // eslint-disable-next-line no-unused-expressions
      (action.type: empty);
      throw new Error(`Invalid action type received: '${action.type}`);
    }
  }
}

export default (React.createContext(() => undefined): React.Context<
  (ContactsAppAction) => void,
>);
