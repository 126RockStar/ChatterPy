// @flow
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import AutomationRow from './AutomationRow';
import ChatterPyContext from '../ChatterPyContext';

const EMPTY_ROW = (
  <div className="section__grid grid">
    <div className="section__grid-item grid__col grid__col--size1" />
    <div className="section__grid-item grid__col grid__col--size2" />
    <div className="section__grid-item grid__col grid__col--size3" />
    <div className="section__grid-item grid__col grid__col--size4" />
    <div className="section__grid-item grid__col grid__col" />
  </div>
);

export default function AutomationApp(): React.Element<'div'> {
  const { allAutomations } = React.useContext(ChatterPyContext);

  const emptyRows = React.useMemo(
    () =>
      new Array(Math.max(0, 6 - allAutomations.length))
        .fill()
        .map((_, i) => <React.Fragment key={i}>{EMPTY_ROW}</React.Fragment>),
    [allAutomations.length],
  );

  return (
    <div className="section__content section__content--home">
      <div className="section__bar">
        <h3>Automations</h3>

        <div className="section__bar-actions">
          <NavLink to="/app/create-automation" className="btn">
            <span>Create Automation</span>
          </NavLink>
        </div>
      </div>

      <div className="section__content-inner">
        <div className="section__grid section__grid--header grid">
          <div className="section__grid-item grid__col grid__col--size1">
            <p>Name</p>
          </div>
          <div className="section__grid-item grid__col grid__col--size2">
            <p>Inbox</p>
          </div>
          <div className="section__grid-item grid__col grid__col--size3">
            <p>Trigger</p>
          </div>
          <div className="section__grid-item grid__col grid__col--size4">
            <p>Status</p>
          </div>
          <div className="section__grid-item grid__col grid__col"></div>
        </div>

        {allAutomations.map(automation => (
          <AutomationRow key={automation.id} automation={automation} />
        ))}

        {emptyRows}
      </div>
    </div>
  );
}
