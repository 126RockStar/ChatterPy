// @flow
import * as React from 'react';
import moment from 'moment';

import ChatterPyContext from '../../ChatterPyContext';
import ChatterPyDispatch from '../../ChatterPyDispatch';
import ChatService from '../../../../services/ChatService';
import ContactsService from '../../../../services/ContactsService';
import Modal from '../../ui/Modal';
import contactForm from '../../../../assets/images/temp/contact-form-image.png';
import parsePhoneNumber from 'libphonenumber-js'

type Props = {
  onRequestClose: () => void,
};

const FORM_STYLE = {
  background:
    'linear-gradient(to bottom, rgba(211, 210, 210, 1) 0%, white 100%)',
};

export default function NewConversationModal({
  onRequestClose,
}: Props): React.Node {
  const globalState = React.useContext(ChatterPyContext);
  const globalDispatch = React.useContext(ChatterPyDispatch);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [phoneValid, setPhoneValid] = React.useState(true)

  const onFirstNameChange = e => setFirstName(e.currentTarget.value);
  const onLastNameChange = e => setLastName(e.currentTarget.value);
  const onPhoneNumberChange = e => setPhoneNumber(e.currentTarget.value);
  const onMessageChange = e => setMessage(e.currentTarget.value);

  const onMessageSend = () => {
    
    if (phoneNumber) {
      const existingContact = globalState.allContacts.find(
        c =>
          c.firstName.toLowerCase().trim() === firstName.toLowerCase().trim() &&
          c.lastName.toLowerCase().trim() === lastName.toLowerCase().trim() &&
          c.phoneNumber.toLowerCase().trim() === phoneNumber.toLowerCase().trim(),
      );
      const phone = parsePhoneNumber('+1'+phoneNumber)
      if (phone) {
        const phone_number = phone.formatInternational()
        setPhoneValid(phone.isValid())
        if (phone.isValid()) {
          const contactPromise = existingContact
          ? Promise.resolve(existingContact)
          : ContactsService.addContact({
              firstName,
              lastName,
              phone_number,
            }).then(c => {
              globalDispatch({
                type: 'CONTACT_ADD',
                contact: c,
              });
              return c;
            });

          contactPromise.then(contact => {
            const { selectedPhoneNumber } = globalState;
            if (selectedPhoneNumber) {
              // do we already have a conversation for this contact?
              const existingConversation = globalState.allConversations.find(
                conversation => conversation.contactId === contact.id,
              );

              const conversationPromise = existingConversation
                ? Promise.resolve(existingConversation)
                : ChatService.createConversation(contact.id).then(conversation => {
                    globalDispatch({
                      conversation: {
                        ...conversation,
                        newestMessage: message,
                        newestTime: moment(),
                      },
                      type: 'CONVERSATION_ADD',
                    });
                    return conversation;
                  });

              conversationPromise
                .then(conversation =>
                  ChatService.sendMessage(
                    conversation.id,
                    selectedPhoneNumber.phoneNumber,
                    contact.phoneNumber,
                    message,
                  ),
                )
                .then(msg => {
                  globalDispatch({
                    type: 'MESSAGE_SEND',
                    message: msg,
                    recipientContactId: contact.id,
                  });
                  onRequestClose();
                });
            }
          });
        } 
      } else {
        setPhoneValid(false)
      }
    }
    // create a new contact first if they don't already exist in our global
    // state, then we can create the conversation
    
  };

  const disableSend = phoneNumber === '' || message === '';

  return (
    <Modal show onRequestClose={onRequestClose}>
      <div className="form" style={FORM_STYLE}>
        <div className="form__head">
          <h3>New Conversation</h3>
        </div>

        <div className="form__body">
          <div className="form__body-inner">
            <div className="form__image">
              <img src={contactForm} alt="" width="201" height="217" />

              <div className="form__image-actions">
                <a href="/#">Change</a>
              </div>
            </div>

            <div className="form__group">
              <div className="form__row">
                <div className="form__controls">
                  <input
                    type="text"
                    className="field"
                    name="first-name"
                    value={firstName}
                    placeholder="First Name (optional)"
                    onChange={onFirstNameChange}
                  />
                </div>
              </div>

              <div className="form__row">
                <div className="form__controls">
                  <input
                    type="text"
                    className="field"
                    name="last-name"
                    value={lastName}
                    placeholder="Last Name (optional)"
                    onChange={onLastNameChange}
                  />
                </div>
              </div>

              <div className="form__row">
                <div className="form__controls">
                  <input
                    className="field"
                    name="phone-number"
                    value={phoneNumber}
                    placeholder="000 000 000"
                    onChange={onPhoneNumberChange}
                  />
                  {
                    !phoneValid && <span style={{color: 'red', fontSize: '12px'}}>Invalid Phone Number</span>
                  }
                </div>
              </div>

              <div className="form__row">
                <div className="form__controls">
                  <input
                    type="text"
                    className="field"
                    name="message"
                    value={message}
                    placeholder="Message"
                    onChange={onMessageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form__actions">
          <input
            type="reset"
            value="Cancel"
            className="form__btn btn-plain btn-plain--small"
            onClick={onRequestClose}
            style={{ marginRight: 8 }}
          />

          <input
            type="submit"
            value="Send"
            className="form__btn btn-plain btn-plain--small btn-plain--blue"
            onClick={onMessageSend}
            disabled={disableSend}
          />
        </div>
      </div>
    </Modal>
  );
}
