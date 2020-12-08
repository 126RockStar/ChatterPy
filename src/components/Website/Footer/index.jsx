// @flow
import * as React from 'react';

import FooterBottom from './FooterBottom';
import FooterTop from './FooterTop';

export default function Footer(): React.Node {
  return (
    <footer>
      <FooterTop />
      <FooterBottom />
    </footer>
  );
}
