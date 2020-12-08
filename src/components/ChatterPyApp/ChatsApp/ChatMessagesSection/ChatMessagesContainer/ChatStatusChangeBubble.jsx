// @flow
import * as React from 'react';

import ChatterPyContext from '../../../ChatterPyContext';
import ChatterPyImages from '../../../../../helpers/ChatterPyImages';
import type { ChatStatusUpdate } from '../../../types';

type Props = {
  statusChange: ChatStatusUpdate,
};

const FLAG_ICON_SRC = {
  Open: ChatterPyImages.Flags.blue,
  Closed: ChatterPyImages.Flags.red,
  New: ChatterPyImages.Flags.green,
  Pending: ChatterPyImages.Flags.yellow,
};

export default function ChatStatusChangeBubble({
  statusChange,
}: Props): React.Element<'div'> {
  const { allUsers } = React.useContext(ChatterPyContext);
  const timeStr = statusChange.timestamp.format('DD/MM/YYYY [AT] h:MM A');

  const user = React.useMemo(
    () => allUsers.find(u => u.id === statusChange.changedBy),
    [allUsers, statusChange.changedBy],
  );

  return (
    <div className="chats__box">
      <div className="chats__box-inner">
        <div className="chats__box-image">
          <img
            src={FLAG_ICON_SRC[statusChange.status]}
            alt=""
            width="36"
            height="40"
          />
        </div>
        <div className="chats__box-content">
          <p>
            Status Changed to {statusChange.status} by{' '}
            {user ? user.fullDisplayName : ''}
          </p>
          <span>{timeStr}</span>
        </div>
      </div>
    </div>
  );
}
