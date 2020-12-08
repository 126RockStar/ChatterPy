// @flow
import * as React from 'react';
import {Form, Input} from 'antd'
import 'antd/dist/antd.css';
type Props = {
  onChange: (val: string) => void,
  placeholder: string,
  value: string,
  fullWidth: boolean,
  error: boolean,
  errorMsg: string,
  name: string,
};

export default function FormInputText({
  onChange,
  placeholder,
  value,
  fullWidth,
  name,
  type,
  error, 
  errorMsg,
}: Props): React.Node {
  const onValChange = e => onChange(e.currentTarget.value);
  const widthClassName = fullWidth ? 'w-100' : '';
  const rules = name === "email" ? [
        { required: true, message: `Please input your ${placeholder}!`},

        {
            type: 'email',
            message: 'The input is not valid E-mail!',
        },
      ] : [
        { required: true, message: `Please input your ${placeholder}!`}
      ]
  const hasFeedback = name === "email" ? true : false
  return (
    <Form.Item 
      className={`form-group ${widthClassName}`} 
      name={name} 
      rules={rules}>
      <Input
        type={type}
        value={value}
        id={name}
        placeholder={placeholder}
        onChange={onValChange}
        hasFeedback={hasFeedback}
      />
      {error && <span style={{color: 'red', fontSize: '12px'}}>{errorMsg}</span>}
    </Form.Item>
  );
}
