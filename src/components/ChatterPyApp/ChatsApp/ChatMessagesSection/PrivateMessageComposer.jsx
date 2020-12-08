// @flow
import * as React from 'react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import ChatterPyContext from '../../ChatterPyContext';
import ChatterPyDispatch from '../../ChatterPyDispatch';
import DirectoryService from '../../../../services/DirectoryService';
import type { Contact, MessageId } from '../../types';

type Props = {
  nodeRef?: { current: ?HTMLDivElement },
  onRequestClose: () => void,
  recipient: Contact,
};

const DEFAULT_USERS = ['Damien Johnson', 'John Doe', 'Aldo Moreno'];

function generateRandomMessageId(): MessageId {
  return ((Math.floor(Math.random()) * 1000 + 1000: any): MessageId);
}

export default function PrivateMessageComposer({
  nodeRef,
  onRequestClose,
  recipient,
}: Props): React.Element<'div'> {
  const globalState = React.useContext(ChatterPyContext);
  const globalDispatch = React.useContext(ChatterPyDispatch);
  const [messageContent, setMessageContent] = React.useState('');

  const userOptions = DEFAULT_USERS.map(name => <span key={name}>{name}</span>);
  const onMessageChange = e => setMessageContent(e.currentTarget.value);
  const onMessageSubmit = () => {
    const { selectedPhoneNumber } = globalState;
    if (selectedPhoneNumber) {
      const msg = {
        type: 'MESSAGE',
        id: generateRandomMessageId(),
        contents: messageContent,
        messageType: 'PRIVATE',
        sender: selectedPhoneNumber.phoneNumber,
        recipient: recipient.phoneNumber,
        sentFromUserId: DirectoryService.getActiveUser().id,
        timestamp: moment(),
        messageId: uuid().slice(0, 15),
      };

      globalDispatch({
        type: 'MESSAGE_SEND',
        message: msg,
        recipientContactId: recipient.id,
      });
    }
  };

  return (
    <div className="chats__private" ref={nodeRef}>
      <div className="chats__private-controls">
        <div className="form-private">
          <div className="form__head">
            <div className="form__head-header">
              <span>Notify</span>
              <div
                role="button"
                className="chats__private-controls-close"
                onClick={onRequestClose}
              >
                Close
              </div>
            </div>

            <div className="form__head-body">{userOptions}</div>
          </div>

          <div className="form__body">
            <div className="form__row">
              <div className="form__controls">
                <input
                  type="text"
                  className="form__field"
                  value={messageContent}
                  onChange={onMessageChange}
                />
                <button
                  type="submit"
                  className="form__btn"
                  onClick={onMessageSubmit}
                >
                  <span>Post</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
