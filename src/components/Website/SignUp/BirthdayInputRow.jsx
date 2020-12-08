// @flow
import * as React from 'react';
import FormDropdown from '../ui/FormDropdown';

function range(start: number, end: number): $ReadOnlyArray<number> {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

const YEARS = range(1991, 2002);

const MONTH_OPTIONS = [
  { value: 'Month', displayName: 'Month' },
  { value: 'January', displayName: 'January' },
  { value: 'February', displayName: 'February' },
  { value: 'March', displayName: 'March' },
  { value: 'April', displayName: 'April' },
  { value: 'May', displayName: 'May' },
  { value: 'June', displayName: 'June' },
  { value: 'July', displayName: 'July' },
  { value: 'August', displayName: 'August' },
  { value: 'September', displayName: 'September' },
  { value: 'October', displayName: 'October' },
  { value: 'November', displayName: 'November' },
  { value: 'December', displayName: 'December' },
];

export default function BirthdayInputRow(): React.Node {
  return (
    <div className="row">
      <div className="col-12">
        <label>Birthday</label>
      </div>
      <div className="col-sm-4">
        <FormDropdown fullWidth options={[{ value: 1, displayName: '01' }]} />
      </div>
      <div className="col-sm-4">
        <FormDropdown fullWidth options={MONTH_OPTIONS} />
      </div>
      <div className="col-sm-4">
        <FormDropdown
          fullWidth
          options={[
            { value: 'year', displayName: 'Year' },
            ...YEARS.map(year => ({
              value: year,
              displayName: String(year),
            })),
          ]}
        />
      </div>
    </div>
  );
}
