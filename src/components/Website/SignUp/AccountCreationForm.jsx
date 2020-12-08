// @flow
import * as React from 'react';

import AuthorizationService from '../../../services/AuthorizationService';
// import BirthdayInputRow from './BirthdayInputRow';
import FormButton from '../ui/FormButton';
import FormCheckbox from '../ui/FormCheckbox';
// import FormDropdown from '../ui/FormDropdown';
import FormInputText from '../ui/FormInputText';
import FormInputPassword from '../ui/FormInputPassword';
import FormInputConfPass from '../ui/FormInputConfpass';
import isEmail from 'validator/lib/isEmail'
import {Form, message} from "antd"
import parsePhoneNumber, { AsYouType } from 'libphonenumber-js'
// const GENDER_OPTIONS = [
//   { value: 'gender', displayName: 'Gender' },
//   { value: 'male', displayName: 'Male' },
//   { value: 'female', displayName: 'Female' },
//   { value: 'custom', displayName: 'Custom' },
//   { value: 'other', displayName: 'Other' },
// ];

export default function AccountCreationForm(): React.Element<'form'> {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState(null);
  const [phoneValid, setPhoneValid] = React.useState(true)
  const onRegisterClick = () => {
    if (phoneNumber) {
      const phone = parsePhoneNumber('+1'+phoneNumber)
      if (phone) {
        const phone_number = phone.formatInternational()
        setPhoneValid(phone.isValid())
        if (phone.isValid()) {
          AuthorizationService.register({
            email,
            password1,
            phone_number,
            firstName,
            lastName,  
          }).then(() => {
            window.location = '/app/chat';
          }).catch(err=>{
            if (err.response.data.email && err.response.data.email.length > 0) {
              message.error(err.response.data.email[0])
            } else if (err.response.data.password1 && err.response.data.password1.length > 0) {
              message.error(err.response.data.password1[0])
            }
          });
        }
        
      } else {
        setPhoneValid(false)
      }
    } else {
      const phone_number = null;
      AuthorizationService.register({
            email,
            password1,
            phone_number,
            firstName,
            lastName,
      }).then(() => {
        window.location = '/app/chat';
      }).catch(err=>{
            if (err.response.data.email && err.response.data.email.length > 0) {
              message.error(err.response.data.email[0])
            } else if (err.response.data.password1 && err.response.data.password1.length > 0) {
              message.error(err.response.data.password1[0])
            }
      });
        }
    }


  const disableRegister = 
    !firstName || !lastName || !email || !isEmail(email) || !password1 || !password2 || password1!==password2;

  return (
    <Form
      name="signup"
      className="sign-up-form"
      initialValues={{ remember: true }}
      onFinish={onRegisterClick}
    >
      <FormInputText
        placeholder="First Name"
        type="text"
        name="first_name"
        value={firstName}
        onChange={setFirstName}
      />

      <FormInputText
        placeholder="Last Name"
        type="text"
        name="last_name"
        value={lastName}
        onChange={setLastName}
      />
      <FormInputText
        placeholder="Email"
        type="email"
        name="email"
        value={email}
        onChange={setEmail}
        fullWidth
      />
      <FormInputText
        placeholder="Phone Number"
        type="phnon"
        name="phone_number"
        value={phoneNumber}
        onChange={setPhoneNumber}
        error={!phoneValid}
        errorMsg="Invalid Phone Number!"
        fullWidth
      />
      <FormInputPassword
        placeholder="Password"
        name="password1"
        value={password1}
        onChange={setPassword1}
      />
      <FormInputConfPass
        placeholder="Re-Password"
        name="password2"
        value={password2}
        onChange={setPassword2}
      />
      <FormCheckbox label="i wish to receive all updates" />
      <FormButton
        disabled={disableRegister}
        fullWidth
        label="Create Account"
        onClick={onRegisterClick}
      />
    </Form>
  );
}
