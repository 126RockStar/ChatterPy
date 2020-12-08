// @flow
import * as React from 'react';

import ChatterPyDispatch from '../../ChatterPyDispatch';
import ChatterPyImages from '../../../../helpers/ChatterPyImages';
import ContactsService from '../../../../services/ContactsService';
// $FlowExpectedError[missing-export]
import { ReactComponent as BinIcon } from '../../../../assets/images/svg/ico-bin.svg';
import type { Contact } from '../../types';

type Props = {
  contact: Contact,
};

export default function ContactRowMobile({ contact }: Props): React.Node {
  const globalDispatch = React.useContext(ChatterPyDispatch);
  const onDeleteClick = e => {
    e.preventDefault();
    ContactsService.deleteContact(contact.id).then(() => {
      globalDispatch({ contactId: contact.id, type: 'CONTACT_DELETE' });
    });
  };

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
          <h4>{`${contact.firstName} ${contact.lastName}`}</h4>
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
            onClick={onDeleteClick}
          >
            <BinIcon style={{ width: 16, height: 21 }} />
          </a>
        </div>
      </div>
    </div>
  );
}
