// @flow
import * as React from 'react';

import ContactsAppDispatch from '../ContactsAppDispatch';
import type { LegacyContactGroup } from '../../types';

type Props = {
  allGroups: $ReadOnlyArray<LegacyContactGroup>,
};

export default function ContactSearchInput({ allGroups }: Props): React.Node {
  const dispatch = React.useContext(ContactsAppDispatch);
  const [searchText, setSearchText] = React.useState('');

  const onInputChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const newText = e.currentTarget.value;
    setSearchText(newText);
    dispatch({ type: 'GROUP_SEARCH', searchText: newText });
  };

  return (
    <input
      type="text"
      className="field field--small"
      name="search-contacts-2"
      id="search-contacts-2"
      placeholder="Search groups"
      value={searchText}
      onChange={onInputChange}
    />
  );
}
