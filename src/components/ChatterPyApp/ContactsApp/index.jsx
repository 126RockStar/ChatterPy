// @flow
import * as React from 'react';

import ChatterPyContext from '../ChatterPyContext';
import ContactsAppDispatch, { contactsAppReducer } from './ContactsAppDispatch';
import MainContainer from './MainContainer';
import NewContactPage from './NewContactPage';
import useJQueryTabs from '../ui/useJQueryTabs';
import { ALL_CONTACT_GROUPS } from '../seedData';
import '../../../assets/scss/components/_react-grid.scss'
/**
 * Whenever the global state changes we will reset the local state.
 * Returns local state and local dispatch.
 */
function useGlobalState() {
  const { allContacts } = React.useContext(ChatterPyContext);
  const [localState, localDispatch] = React.useReducer(contactsAppReducer, {
    allContacts,
    visibleContacts: allContacts,
    allGroups: ALL_CONTACT_GROUPS,
    visibleGroups: ALL_CONTACT_GROUPS,
  });

  // reset the state whenever the global state changes
  React.useEffect(() => {
    localDispatch({
      type: 'STATE_RESET',
      initArgs: { allContacts },
    });
  }, [allContacts]);

  return [localState, localDispatch];
}

export default function ContactsApp(): React.Node {
  useJQueryTabs();
  const [localState, localDispatch] = useGlobalState();
  const { allContacts, visibleContacts, allGroups, visibleGroups } = localState;
  const [isCreatingNewContact, setIsCreatingNewContact] = React.useState(false);

  return (
    <ContactsAppDispatch.Provider value={localDispatch}>
      {!isCreatingNewContact && (
        <MainContainer
          allContacts={allContacts}
          allGroups={allGroups}
          visibleContacts={visibleContacts}
          visibleGroups={visibleGroups}
          onRequestAddContact={() => setIsCreatingNewContact(true)}
        />
      )}
      {isCreatingNewContact && (
        <NewContactPage onRequestClose={() => setIsCreatingNewContact(false)} />
      )}
    </ContactsAppDispatch.Provider>
  );
}
