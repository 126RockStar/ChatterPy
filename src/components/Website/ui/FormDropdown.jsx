// @flow
import * as React from 'react';

import Dropdown from './Dropdown';

type Props<T> = {
  options: $ReadOnlyArray<{ value: T, displayName: string }>,

  /** Adds a 'w-100' class name to the form group div */
  formGroupFullWidth?: boolean,

  /**
   * Adds a 'w-100' class name to both the form group div and the Dropdown
   * component. This prop overrides `formGroupFullWidth` and
   * `dropdownFullWidth`.
   */
  fullWidth?: boolean,

  /** Adds a 'w-100' class name to the Dropdown component */
  dropdownFullWidth?: boolean,
};

export default function FormDropdown<T>({
  options,
  formGroupFullWidth = false,
  fullWidth = false,
  dropdownFullWidth = false,
}: Props<T>): React.Node {
  const widthClassName = fullWidth || formGroupFullWidth ? 'w-100' : '';
  return (
    <div className={`form-group ${widthClassName}`}>
      <Dropdown options={options} fullWidth={fullWidth || dropdownFullWidth} />
    </div>
  );
}
