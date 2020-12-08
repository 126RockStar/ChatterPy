// @flow
import * as React from 'react';

import DropdownTrigger from '../ui/DropdownTrigger';

const MESSAGE_OPTIONS = [
  'Content #1',
  'Content #2',
  'Content #3',
  'Content #4',
];

export default function ActionBox(): React.Element<'div'> {
  return (
    <div className="widget">
      <div className="widget__inner">
        <div className="widget__head">
          <h4 className="widget__title">Action</h4>
        </div>

        <div className="widget__body">
          <DropdownTrigger
            inlineExpand
            trigger="Send Message"
            options={MESSAGE_OPTIONS}
          />
        </div>

        <footer className="widget__foot">
          <a href="/#">Select a template</a>
        </footer>
      </div>
    </div>
  );
}
