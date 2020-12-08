// @flow
import * as React from 'react';

import ChatterPyDispatch from '../../ChatterPyDispatch';
import ChatterPyImages from '../../../../helpers/ChatterPyImages';
import ContactsService from '../../../../services/ContactsService';
import type { Contact } from '../../types';

type Props = {
  contact: Contact,
};

export default function ContactRow({ contact }: Props): React.Node {
  const globalDispatch = React.useContext(ChatterPyDispatch);
  const onDeleteClick = e => {
    e.preventDefault();
    ContactsService.deleteContact(contact.id).then(() => {
      globalDispatch({ contactId: contact.id, type: 'CONTACT_DELETE' });
    });
  };

  return (
    <div className="section__row grid">
      <div className="section__row-item grid__col grid__col--size7">
        <p className="visible-xs-block hidden">First Name:</p>
        <p>{contact.firstName}</p>
      </div>

      <div className="section__row-item grid__col grid__col--size8">
        <p className="visible-xs-block hidden">Last Name:</p>
        <p>{contact.lastName}</p>
      </div>

      <div className="section__row-item grid__col grid__col--size10 hidden-xs"></div>

      <div className="section__row-item grid__col grid__col--size9">
        <p className="visible-xs-block hidden">Phone Number:</p>
        <a href={`tel:${contact.phoneNumber}`}>{contact.phoneNumber}</a>
      </div>

      <div className="section__row-item grid__col grid__col">
        <div className="section__table-actions">
          <a href="/#" className="link-chat">
            <img
              src={ChatterPyImages.Icons.chatBlue}
              alt=""
              width="21"
              height="19"
            />
          </a>

          <a href="/#" className="btn-red" onClick={onDeleteClick}>
            Delete
          </a>
        </div>
      </div>
    </div>
  );
}
