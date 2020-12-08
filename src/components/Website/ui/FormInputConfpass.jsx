// @flow
import * as React from 'react';

import uniqueId from '../../../utils/uniqueId';
import {Form, Input} from 'antd'
import '../../../assets/scss/components/_antd.scss'
type Props = {
  onChange: (val: string) => void,
  placeholder: string,
  value: string,
  id?: string,
  error: boolean,
  errorMsg: string,
  name: string,
};

export default function FormInputPassword({
  onChange,
  placeholder,
  value,
  id = `input-password-${uniqueId()}`,
  name,
}: Props): React.Node {

  return (
      <Form.Item
        name={name}
        style={{width: 'calc(50% - 15px)'}}
        dependencies={['password1']}
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password1') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password 
        style={{
          borderRadius: '25px', 
          boxShadow: '0px 0px 9px 1px rgba(83, 80, 255, 0.1)', 
          border: 'none', 
          height: '50px', 
          paddingLeft: '20px'
        }} 
        placeholder={placeholder} 
        id={name} value={value} 
        onChange={e => onChange(e.currentTarget.value)} />
      </Form.Item>

  );
}
