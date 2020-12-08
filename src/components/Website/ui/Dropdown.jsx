// @flow
import * as React from 'react';

type Props<T> = {
  options: $ReadOnlyArray<{ value: T, displayName: string }>,

  /** Adds a 'w-100' class name to the component */
  fullWidth?: boolean,
};

export default function Dropdown<T>({
  options,
  fullWidth = false,
}: Props<T>): React.Element<'select'> {
  React.useLayoutEffect(() => {
    window.$('select').niceSelect();
  }, []);

  const widthClassName = fullWidth ? 'w-100' : '';

  return (
    <select className={`select-bar ${widthClassName}`}>
      {options.map(opt => (
        <option key={opt.displayName} value={opt.value}>
          {opt.displayName}
        </option>
      ))}
    </select>
  );
}
