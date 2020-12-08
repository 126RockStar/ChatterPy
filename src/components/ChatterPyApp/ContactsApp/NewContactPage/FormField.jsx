// @flow
import * as React from 'react';

type Props = {
  id: string,
  onChange: (value: string) => void,
  placeholder: string,
  value: string,
};

export default function FormField({
  id,
  onChange,
  placeholder,
  value,
}: Props): React.Node {
  const onValueChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    onChange(val);
  };

  return (
    <div className="form__row">
      <label htmlFor={id} className="form__label hidden">
        {placeholder}
      </label>

      <div className="form__controls">
        <input
          type="text"
          className="field"
          name={id}
          id={id}
          placeholder={placeholder}
          onChange={onValueChange}
        />
      </div>
    </div>
  );
}
