// @flow
import * as React from 'react';

import ChatterPyImages from '../../../../helpers/ChatterPyImages';
import ContactsAppDispatch from '../ContactsAppDispatch';
import type { LegacyContactGroup } from '../../types';
// $FlowExpectedError[missing-export]
import { ReactComponent as BinIcon } from '../../../../assets/images/svg/ico-bin.svg';

type Props = {
  group: LegacyContactGroup,
};

export default function GroupRowMobile({ group }: Props): React.Node {
  const dispatch = React.useContext(ContactsAppDispatch);

  return (
    <div className="chat chat--alt">
      <div className="chat__inner">
        <div className="chat__image">
          <img
            src={ChatterPyImages.Icons.profile}
            alt=""
            width="58"
            height="58"
          />
        </div>

        <div className="chat__content">
          <h4>{group.groupName}</h4>
        </div>

        <div className="chat__utilities">
          <a href="/#" className="link-chat">
            <img
              src={ChatterPyImages.Icons.chatBlue}
              alt=""
              width="19"
              height="17"
            />
          </a>

          <a
            href="/#"
            className="link-delete link-delete--big"
            onClick={e => {
              e.preventDefault();
              dispatch({ group, type: 'GROUP_DELETE' });
            }}
          >
            <BinIcon style={{ width: 16, height: 21 }} />
          </a>
        </div>
      </div>
    </div>
  );
}
