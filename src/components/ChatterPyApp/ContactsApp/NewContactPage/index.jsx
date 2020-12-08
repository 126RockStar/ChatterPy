// @flow
import * as React from 'react';

import ContactsService from '../../../../services/ContactsService';
import ChatterPyDispatch from '../../ChatterPyDispatch';
import FormField from './FormField';
import ChatterPyImages from '../../../../helpers/ChatterPyImages';

const FORM_STYLE = {
  background:
    'linear-gradient(to bottom, rgba(211, 210, 210, 1) 0%, white 100%)',
};

type Props = {
  onRequestClose: () => void,
};

export default function NewContactPage({ onRequestClose }: Props): React.Node {
  const globalDispatch = React.useContext(ChatterPyDispatch);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [listName, setListName] = React.useState('');

  const isSubmitEnabled = firstName && lastName && phoneNumber;

  const onContactSubmit = (e: SyntheticMouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (isSubmitEnabled) {
      ContactsService.addContact({
        firstName,
        lastName,
        phoneNumber,
      }).then(contact => {
        globalDispatch({
          contact,
          type: 'CONTACT_ADD',
        });
        onRequestClose();
      });
    }
  };

  return (
    <div className="section__content section__content--contacts-alt">
      <div className="section__bar section__bar--alt">
        <h3>Contacts</h3>

        <div className="section__bar-actions">
          <a
            href="/#"
            className="section__btn btn btn--small"
            style={{ marginRight: 5 }}
          >
            <span>Create Contact</span>
          </a>

          <a href="/#" className="section__btn btn btn--small btn--blue">
            <span>Import Contact</span>
          </a>
        </div>
      </div>
      <div className="section__content section__content--contacts-alt">
        <div className="section__content-inner section__content-inner--alt">
          <div className="form" style={FORM_STYLE}>
            <form action="?" method="post">
              <div className="form__head">
                <h3>New Contact</h3>
              </div>

              <div className="form__body">
                <div className="form__body-inner">
                  <div className="form__image">
                    <img
                      src={ChatterPyImages.contactFormImage}
                      alt=""
                      width="162"
                      height="175"
                    />

                    <div className="form__image-actions">
                      <a href="/#">Change</a>
                    </div>
                  </div>

                  <div className="form__group">
                    <FormField
                      id="first-name"
                      placeholder="First Name"
                      value={firstName}
                      onChange={setFirstName}
                    />
                    <FormField
                      id="last-name"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={setLastName}
                    />
                    <FormField
                      id="phone-number"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                    />
                    <FormField
                      id="email-address"
                      placeholder="Email Address"
                      value={email}
                      onChange={setEmail}
                    />
                    <FormField
                      id="list-name"
                      placeholder="Enter List Name"
                      value={listName}
                      onChange={setListName}
                    />
                  </div>
                </div>
              </div>

              <div className="form__actions">
                <input
                  type="reset"
                  value="Cancel"
                  className="form__btn btn-plain btn-plain--small"
                  onClick={() => onRequestClose()}
                  style={{ marginRight: 5 }}
                />

                <input
                  disabled={!isSubmitEnabled}
                  type="submit"
                  value="Save"
                  className="form__btn btn-plain btn-plain--small btn-plain--blue"
                  onClick={onContactSubmit}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
