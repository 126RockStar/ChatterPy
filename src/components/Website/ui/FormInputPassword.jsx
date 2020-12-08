// @flow
import * as React from 'react';

import uniqueId from '../../../utils/uniqueId';
import {Form, Input} from 'antd'
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
  fullWidth,
}: Props): React.Node {
  const width = fullWidth ? '100%' : 'calc(50% - 15px)';
  return (
      <Form.Item
        name={name}
        className={fullWidth}
        style={{width: `${width}`}}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password 
        style={{
          borderRadius: '25px', 
          boxShadow: '0px 0px 9px 1px rgba(83, 80, 255, 0.1)', 
          border: 'none', 
          height: '52px', 
          paddingLeft: '20px',
          background: 'transparent'
        }}
        placeholder={placeholder} 
        id={name} 
        value={value} 
        onChange={e => onChange(e.currentTarget.value)} />
      </Form.Item>

  );
}
