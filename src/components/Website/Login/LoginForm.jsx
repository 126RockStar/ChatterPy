// @flow
import * as React from 'react';

import AuthorizationService from '../../../services/AuthorizationService';
import FormButton from '../ui/FormButton';
import FormInputText from '../ui/FormInputText';
import FormInputPassword from '../ui/FormInputPassword';
import isEmail from 'validator/lib/isEmail'
import 'antd/dist/antd.css';
import { message, Form } from 'antd';
export default function LoginForm(): React.Node {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  // const [errors, setErrors] = React.useState();
  const onLoginClick = () => {
    if (email && password) {
      AuthorizationService.login(email, password).then(() => {
        window.location = '/app/chat';
      }).catch(err=>message.error(err.response.data.non_field_errors[0], 2000))
    }
  }; 

  const disableLogin = !email || !isEmail(email) || !password;
  return (
    <Form
      name="signin"
      className="sign-in-form"
      initialValues={{ remember: true }}
      onFinish={onLoginClick}
    >
      <FormInputText
        name="useremail"
        value={email}
        placeholder="User Name or Email"
        onChange={setEmail}
      />
      <FormInputPassword
        name="password"
        value={password}
        onChange={setPassword}
        placeholder="Password"
        fullWidth
      />
      <FormButton
        fullWidth
        disabled={disableLogin}
        label="Login Account"
        onClick={onLoginClick}
      />
    </Form>
  );
}
