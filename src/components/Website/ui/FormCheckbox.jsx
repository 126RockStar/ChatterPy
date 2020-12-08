// @flow
import * as React from 'react';

import uniqueId from '../../../utils/uniqueId';

type Props = {
  label: string,
  id?: string,
};

export default function FormCheckbox({
  label,
  id = `input-checkbox-${uniqueId()}`,
}: Props): React.Node {
  return (
    <div className="form-group w-100 checkgroup">
      <input type="checkbox" defaultChecked id={id} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
