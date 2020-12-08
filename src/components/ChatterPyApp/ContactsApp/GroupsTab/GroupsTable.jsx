// @flow
import * as React from 'react';

import EmptyRow from './EmptyRow';
import GroupRow from './GroupRow';
import Table from '../Table';
import type { LegacyContactGroup } from '../../types';

type Props = {
  groups: $ReadOnlyArray<LegacyContactGroup>,
};

export default function GroupsTable({ groups }: Props): React.Node {
  const renderHeaderRow = React.useCallback(() => {
    return (
      <div className="section__row-header grid">
        <div className="section__row-item grid__col grid__col--size7 hidden-xs">
          <p>Group</p>
        </div>
        <div className="section__row-item grid__col grid__col--size11 hidden-xs">
          <p>Members</p>
        </div>
        <div className="section__row-item grid__col grid__col"></div>
        <div className="section__row-item grid__col grid__col--size12 hidden-xs"></div>
        <div className="section__row-item grid__col grid__col visible-xs-block hidden">
          <p>Groups info</p>
        </div>
      </div>
    );
  }, []);

  const renderRow = React.useCallback(
    group => <GroupRow key={group.id} group={group} />,
    [],
  );

  return (
    <Table
      data={groups}
      renderHeaderRow={renderHeaderRow}
      renderRow={renderRow}
      pageSize={6}
      EmptyRow={EmptyRow}
    />
  );
}
