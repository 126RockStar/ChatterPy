// @flow
import * as React from 'react';

import ContactsAppDispatch from '../ContactsAppDispatch';

type Props = {
  id: string,
  name: string,
  placeholder?: string,
};

export default function ContactSearchInput({
  id,
  name,
  placeholder = 'Search contacts',
}: Props): React.Node {
  const dispatch = React.useContext(ContactsAppDispatch);
  const [searchText, setSearchText] = React.useState('');

  const onInputChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const newText = e.currentTarget.value;
    setSearchText(newText);
    dispatch({ type: 'CONTACT_SEARCH', searchText: newText });
  };

  return (
    <input
      type="text"
      className="field field--small"
      name={name}
      id={id}
      placeholder={placeholder}
      value={searchText}
      onChange={onInputChange}
    />
  );
}
