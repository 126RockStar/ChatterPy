// @flow
import * as React from 'react';

import UserRow from './UserRow';
import type { LegacyUser } from '../types';

type Props = {
  users: $ReadOnlyArray<LegacyUser>,
  userType: 'ACTIVE' | 'PENDING',
};

function UserTable({ users, userType }: Props): React.Node {
  return (
    <div className="section__table">
      <div className="section__table-inner">
        <div className="section__row-header grid">
          <div className="section__row-item grid__col grid__col--size15 hidden-xs"></div>

          <div className="section__row-item grid__col grid__col--size16 hidden-xs">
            <p>Name</p>
          </div>

          <div className="section__row-item grid__col grid__col--size17 hidden-xs">
            <p>Role</p>
          </div>

          <div className="section__row-item grid__col grid__col--size18 hidden-xs"></div>

          <div className="section__row-item grid__col grid__col--size7 hidden-xs">
            <p>Email</p>
          </div>

          <div className="section__row-item grid__col grid__col--size19 hidden-xs"></div>

          <div className="section__row-item grid__col grid__col visible-xs-block hidden">
            <p>Active users</p>
          </div>
        </div>

        {users.map(user => (
          <UserRow key={user.id} user={user} userType={userType} />
        ))}
      </div>
    </div>
  );
}

export default (React.memo(UserTable): React.AbstractComponent<Props>);
