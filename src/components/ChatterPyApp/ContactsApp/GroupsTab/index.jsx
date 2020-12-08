import * as React from 'react';

import GroupRowMobile from './GroupRowMobile';
import GroupsTable from './GroupsTable';
import GroupSearchInput from './GroupsSearchInput';
import type { ContactGroup } from '../../types';

type Props = {
  allGroups: $ReadOnlyArray<ContactGroup>,
  visibleGroups: $ReadOnlyArray<ContactGroup>,
};

export default function GroupsTab({
  allGroups,
  visibleGroups,
}: Props): React.Node {
  const groupRowsMobile = visibleGroups.map(group => (
    <GroupRowMobile key={group.id} group={group} />
  ));

  return (
    <>
      <div className="tabs__utilities hidden-xs">
        <div className="tab__cols">
          <div className="tab__col tab__col--size1">
            <div className="select">
              <select name="field-2#" id="field-2#">
                <option value="">All (0)</option>
                <option value="">Select 1</option>
                <option value="">Select 2</option>
              </select>
            </div>
          </div>

          <div className="tab__col tab__col--size2">
            <label
              htmlFor="search-contacts-2"
              className="tab__field-label hidden"
            >
              1#
            </label>

            <div className="tab__field-controls">
              <GroupSearchInput allGroups={allGroups} />
            </div>
          </div>
        </div>

        <div className="tab__actions">
          <a href="/#" className="btn-plain btn-plain--blue">
            CREATE
          </a>
        </div>
      </div>

      <div className="tab__inner">
        <div className="chats-alt visible-xs-block hidden">
          {groupRowsMobile}
        </div>
        <GroupsTable groups={visibleGroups} />
        <div className="section__table hidden-xs">
          <div className="section__table-inner"></div>
        </div>
      </div>
    </>
  );
}
