// @flow
import * as React from 'react';

import ChatterPyImages from '../../../helpers/ChatterPyImages';
import ContactSearchInput from './ContactsTab/ContactSearchInput';
import ContactsTab from './ContactsTab';
import GroupsTab from './GroupsTab';
import type { Contact, LegacyContactGroup } from '../types';

type Props = {
  allContacts: $ReadOnlyArray<Contact>,
  allGroups: $ReadOnlyArray<LegacyContactGroup>,
  onRequestAddContact: () => void,
  visibleContacts: $ReadOnlyArray<Contact>,
  visibleGroups: $ReadOnlyArray<LegacyContactGroup>,
};

export default function MainContainer({
  allContacts,
  allGroups,
  onRequestAddContact,
  visibleContacts,
  visibleGroups,
}: Props): React.Node {
  return (
    <div className="section__content section__content--contacts">
      <div className="section__content-inner">
        <h3 className="hidden-xs">Contacts</h3>
        <div className="tabs js-tabs">
          <div className="tabs__head">
            <div className="tabs__utilities tabs__utilities--alt visible-xs-flex hidden">
              <div className="tab__search">
                <label htmlFor="search-2" className="tab__field-label hidden">
                  1#
                </label>
                <div className="tab__field-controls">
                  <img
                    src={ChatterPyImages.Icons.search}
                    alt=""
                    width="25"
                    height="24"
                  />
                  <ContactSearchInput
                    id="search-2"
                    name="search"
                    placeholder="Search"
                  />
                </div>
              </div>
              <a
                href="/#"
                className="link-add"
                onClick={e => {
                  e.preventDefault();
                  onRequestAddContact();
                }}
              >
                +
              </a>
            </div>

            <nav className="tabs__nav">
              <ul>
                <li className="is-current">
                  <a href="#tab-1">Contacts</a>
                </li>
                <li>
                  <a href="#tab-2">Groups</a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="tabs__body">
            <div className="tab is-current translating-in" id="tab-1">
              <ContactsTab
                allContacts={allContacts}
                visibleContacts={visibleContacts}
                onAddContactClick={onRequestAddContact}
              />
            </div>
            <div className="tab" id="tab-2">
              <GroupsTab allGroups={allGroups} visibleGroups={visibleGroups} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
