// @flow
import * as React from 'react';

export default function ContactInfoPanel(): React.Node {
  return (
    <ul>
      <li className="mr-3">
        <a href="Tel:4242037695">
          <i className="fas fa-phone-square" />
          (424) 203-7695
        </a>
      </li>
      <li>
        <a href="Mailto:sales@chatterpy.com">
          <i className="fas fa-envelope" />
          sales@chatterpy.com
        </a>
      </li>
    </ul>
  );
}
