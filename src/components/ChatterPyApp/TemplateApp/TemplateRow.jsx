// @flow
import * as React from 'react';

import type { Template } from '../types';

type Props = {
  template: Template,
};

export default function TemplateRow({ template }: Props): React.Node {
  // const [isActive, setIsActive] = React.useState(automation.active);
  // const onStatusChange = e => setIsActive(e.currentTarget.checked);

  return (
    <div className="section__grid grid">
      <div className="section__grid-item grid__col grid__col--size1">
        <p className="visible-xs-block hidden">Name:</p>

        <p>{template.name}</p>
      </div>

      <div className="section__grid-item grid__col grid__col--size2">
        <p className="visible-xs-block hidden">Inbox:</p>

        <p>Inbox 1</p>
      </div>

      {/*<div className="section__grid-item grid__col grid__col--size3">
        <p className="visible-xs-block hidden">Trigger:</p>

        <p>{automation.trigger}</p>
      </div>*/}

      {/*<div className="section__grid-item grid__col grid__col--size4">
        <p className="visible-xs-block hidden">Status:</p>

        <div className="toggle js-toggle-switch">
          <input
            type="checkbox"
            name="toggle__switch-field"
            id="toggle__switch-field"
            onChange={onStatusChange}
            checked={isActive}
          />

          <label
            htmlFor="toggle__switch-field"
            className="toggle__label is-active"
          ></label>

          <label
            htmlFor="toggle__switch-field"
            className="toggle__label"
          ></label>

          <span className="toggle__switch"></span>
        </div>
      </div>*/}

      <div className="section__grid-item section__grid-item--more grid__col grid__col">
        <a href="/#" className="link-more">
          <span></span>

          <span></span>

          <span></span>
        </a>
      </div>
    </div>
  );
}
