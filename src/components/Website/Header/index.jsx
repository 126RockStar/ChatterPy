// @flow
import * as React from 'react';

import HeaderTop from './HeaderTop';
import HeaderBottom from './HeaderBottom';

export default function Header(): React.Node {
  return (
    <header>
      <HeaderTop />
      <HeaderBottom />
    </header>
  );
}
