// @flow
import * as React from 'react';

import ChatterPyImages from '../../../../helpers/ChatterPyImages';
import ContactsAppDispatch from '../ContactsAppDispatch';
import type { LegacyContactGroup } from '../../types';

type Props = {
  group: LegacyContactGroup,
};

export default function GroupRow({ group }: Props): React.Node {
  const dispatch = React.useContext(ContactsAppDispatch);
  return (
    <div className="section__row grid">
      <div className="section__row-item grid__col grid__col--size7">
        <p className="visible-xs-block hidden">Group: </p>

        <p>{group.groupName}</p>
      </div>

      <div className="section__row-item grid__col grid__col--size11">
        <p className="visible-xs-block hidden">Members:</p>

        <p>{group.members.map(c => c.firstName).join(', ')}</p>
      </div>

      <div className="section__row-item grid__col grid__col"></div>

      <div className="section__row-item grid__col grid__col--size12">
        <div className="section__table-actions">
          <a href="/#" className="link-chat">
            <img
              src={ChatterPyImages.Icons.chatBlue}
              alt=""
              width="26"
              height="24"
            />
          </a>
          <a
            href="/#"
            className="btn-red"
            onClick={e => {
              e.preventDefault();
              dispatch({ group, type: 'GROUP_DELETE' });
            }}
          >
            Delete
          </a>
        </div>
      </div>
    </div>
  );
}
