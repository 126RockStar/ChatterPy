// @flow
import * as React from 'react';

import ActionBox from './ActionBox';
import DropdownTrigger from '../ui/DropdownTrigger';

const INCOMING_MESSAGE_OPTIONS = [
  'Content #1',
  'Content #2',
  'Content #3',
  'Content #4',
];

export default function AutomationStepsPanel(): React.Element<'div'> {
  const [numSteps, setNumSteps] = React.useState(1);
  const onAddStepClick = () => setNumSteps(num => num + 1);
  const mainDivRef = React.useRef();

  React.useEffect(() => {
    if (mainDivRef.current) {
      const mainElt = mainDivRef.current;
      const { top } = mainElt.getBoundingClientRect();
      const topOfContainer = window.scrollY + top;
      const newHeight = window.innerHeight - topOfContainer;
      mainElt.style.height = `${newHeight}px`;
    }
  });

  const actionBoxes = new Array(numSteps)
    .fill()
    .map((_, i) => <ActionBox key={i} />);

  return (
    <div
      ref={mainDivRef}
      className="section__grid-col grid__col grid__col--size5"
      style={{ padding: '40px 0', overflowY: 'scroll' }}
    >
      <div className="widgets-steps">
        <div className="widgets__inner">
          <div className="widget">
            <div className="widget__inner">
              <div className="widget__head">
                <h4 className="widget__title">Trigger</h4>
              </div>

              <div className="widget__body">
                <DropdownTrigger
                  inlineExpand
                  trigger="First Incoming Message"
                  options={INCOMING_MESSAGE_OPTIONS}
                />
              </div>

              <footer className="widget__foot">
                <ul className="list-options">
                  <li>Exclude existing chats</li>
                </ul>
              </footer>
            </div>
          </div>

          {actionBoxes}
        </div>

        <div className="widgets__actions">
          <div role="button" onClick={onAddStepClick}>
            Add Step
          </div>
        </div>
      </div>
    </div>
  );
}
