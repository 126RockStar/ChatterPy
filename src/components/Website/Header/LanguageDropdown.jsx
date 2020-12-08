// @flow
import * as React from 'react';

import Dropdown from '../ui/Dropdown';

const LANGUAGES = [
  { value: 1, displayName: 'English' },
  { value: 2, displayName: 'Bangla' },
  { value: 3, displayName: 'Hindi' },
  { value: 4, displayName: 'Urdu' },
];

export default function LanguageDropdown(): React.Node {
  return <Dropdown options={LANGUAGES} />;
}
