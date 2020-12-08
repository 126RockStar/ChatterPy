// @flow
import * as React from 'react';
import ChatterPyImages from '../../../helpers/ChatterPyImages';

type Props = {
  name: string,
  onChange: (value: string) => void,
  value: string,
};

export default function SearchInput({
  name,
  onChange,
  value,
}: Props): React.Node {
  const onValChange = (event: SyntheticInputEvent<HTMLInputElement>) =>
    onChange(event.currentTarget.value);

  return (
    <>
      <label htmlFor={name} className="tab__field-label hidden">
        1#
      </label>
      <div className="tab__field-controls">
        <img src={ChatterPyImages.Icons.search} alt="" width="20" height="19" />

        <input
          type="text"
          className="field field--small"
          name={name}
          id={name}
          placeholder="Search"
          value={value}
          onChange={onValChange}
        />
      </div>
    </>
  );
}
