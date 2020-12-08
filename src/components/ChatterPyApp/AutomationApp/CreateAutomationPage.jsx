// @flow
import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';

import AutomationsService from '../../../services/AutomationsService';
import AutomationStepsPanel from './AutomationStepsPanel';
import ChatterPyContext from '../ChatterPyContext';
import ChatterPyDispatch from '../ChatterPyDispatch';

export default function CreateAutomationPage(): React.Element<'div'> {
  const history = useHistory();
  const { selectedPhoneNumber } = React.useContext(ChatterPyContext);
  const globalDispatch = React.useContext(ChatterPyDispatch);
  const [name, setName] = React.useState('');

  const onSaveClick = e => {
    e.preventDefault();
    if (selectedPhoneNumber) {
      AutomationsService.addAutomation(
        name,
        'First Incoming Message',
        selectedPhoneNumber.id,
      ).then(automation => {
        globalDispatch({
          automation,
          type: 'AUTOMATION_ADD',
        });
        history.push('/app/automation-list');
      });
    }
  };

  return (
    <div className="section__content section__content--automation">
      <div className="section__bar">
        <h3>New Automation</h3>

        <div className="section__bar-actions">
          <Link to="/app/automation-list">Cancel</Link>
          <a href="/#" className="btn btn--smaller" onClick={onSaveClick}>
            <span>Save</span>
          </a>
        </div>
      </div>

      <div className="section__content-inner">
        <div className="section__field-controls">
          <input
            type="text"
            className="field-plain"
            placeholder="Enter Automation Name"
            value={name}
            onChange={e => setName(e.currentTarget.value)}
          />
        </div>

        <div className="section__grid grid" style={{ padding: 'unset' }}>
          <AutomationStepsPanel />

          <div
            className="section__grid-col grid__col grid__col--size6"
            style={{ padding: '40px 0' }}
          >
            <div className="section__content-info">
              <strong>Inbox:</strong>
              <p>
                <strong>Inbox 1</strong>
                <a href="tel:(818)875-5977">(818) 875-5977</a>
              </p>
              <span>Status: Off</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
