// @flow
import * as React from 'react';

import ChatterPyContext from '../../../ChatterPyContext';
import exclamationMark from '../../../../../assets/images/temp/ico-exclamation-mark@2x.png';
import type { ChatOwnerAssignment } from '../../../types';

type Props = {
  ownerChange: ChatOwnerAssignment,
};

export default function ChatOwnerChangeBubble({
  ownerChange,
}: Props): React.Element<'div'> | null {
  const { allUsers } = React.useContext(ChatterPyContext);

  const timeStr = ownerChange.timestamp.format('DD/MM/YYYY [AT] h:MM A');
  const changedBy = React.useMemo(
    () => allUsers.find(u => u.id === ownerChange.changedBy),
    [allUsers, ownerChange.changedBy],
  );

  const owner = React.useMemo(
    () => allUsers.find(u => u.id === ownerChange.owner),
    [allUsers, ownerChange.owner],
  );

  if (changedBy === undefined) {
    return null;
  }

  const changedByName = changedBy.fullDisplayName;
  const ownerName = owner === undefined ? '' : owner.fullDisplayName;
  const summaryStr =
    owner === undefined
      ? `Owner was unassigned by ${changedByName}`
      : `${changedByName} assigned ownership to ${ownerName}`;

  return (
    <div className="chats__box chats__box--notifications">
      <div className="chats__box-inner">
        <div className="chats__box-image">
          <img src={exclamationMark} alt="" width="34" height="29" />
        </div>
        <div className="chats__box-content">
          <p>{summaryStr}</p>
          <span>{timeStr}</span>
        </div>
      </div>
    </div>
  );
}
