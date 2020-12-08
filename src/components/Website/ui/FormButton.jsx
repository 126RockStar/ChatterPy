// @flow
import * as React from 'react';

type Props = {
  label: string,
  onClick: () => void,

  /** Adds a 'w-100' class name to the outer div */
  fullWidth?: boolean,
  disabled?: boolean,
};

export default function FormButton({
  label,
  onClick,
  fullWidth = false,
  disabled = false,
}: Props): React.Node {
  const widthClassName = fullWidth ? 'w-100' : '';
  const style = disabled ? { cursor: 'not-allowed' } : undefined;
  return (
    <div className={`form-group ${widthClassName}`}>
      <input
        disabled={disabled}
        type="submit"
        value={label}
        style={style}
        onClick={e => {
          e.preventDefault();
          onClick();
        }}
      />
    </div>
  );
}
