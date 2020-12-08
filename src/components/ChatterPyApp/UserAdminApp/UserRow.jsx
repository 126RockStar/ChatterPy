// @flow
import * as React from 'react';

import ChatterPyImages from '../../../helpers/ChatterPyImages';
import UserAdminDispatch from './UserAdminDispatch';
// $FlowExpectedError[missing-export]
import { ReactComponent as BinIcon } from '../../../assets/images/svg/ico-bin.svg';
import type { LegacyUser } from '../types';

type Props = {
  user: LegacyUser,
  userType: 'ACTIVE' | 'PENDING',
};

export default function UserRow({ user, userType }: Props): React.Node {
  const dispatch = React.useContext(UserAdminDispatch);
  const onDeleteClick = (e: SyntheticMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (userType === 'ACTIVE') {
      dispatch({ user, type: 'USER_DELETE' });
    } else {
      dispatch({ user, type: 'PENDING_USER_DELETE' });
    }
  };

  return (
    <div key={user.id} className="section__row grid">
      <div className="section__row-item grid__col grid__col--size15 ">
        <img
          src={ChatterPyImages.Icons.profile}
          alt=""
          width="42"
          height="42"
        />
      </div>

      <div className="section__row-item grid__col grid__col--size16">
        <p className="visible-xs-block hidden">Name:</p>
        <p>{user.fullName}</p>
      </div>
      <div className="section__row-item grid__col grid__col--size17">
        <p className="visible-xs-block hidden">Role:</p>
        <p>{user.role}</p>
      </div>

      <div className="section__row-item grid__col grid__col--size18 hidden-xs"></div>

      <div className="section__row-item grid__col grid__col--size7">
        <p className="visible-xs-block hidden">Email:</p>

        <a href={`mailto:${user.email}`}>{user.email}</a>
      </div>

      <div className="section__row-item grid__col grid__col--size19">
        <a href="/#" className="link-delete" onClick={onDeleteClick}>
          <BinIcon style={{ width: 16, height: 21 }} />
        </a>
      </div>
    </div>
  );
}
