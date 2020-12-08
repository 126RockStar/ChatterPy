// @flow
import * as React from 'react';

import ChatterPyImages from '../../../helpers/ChatterPyImages';

export default function CurrentPlanBlock(): React.Node {
  return (
    <div className="accordion__section">
      <div className="accordion__head accordion__head--alt">
        <h4>
          current plan
          <a
            href="/#"
            className="accordion__trigger js-accordion-trigger visible-xs-inline-block hidden"
          >
            view
          </a>
        </h4>

        <div className="accordion__head-content hidden-xs">
          <div className="grid">
            <div className="grid__col">
              <strong>
                <i>Standard</i>
              </strong>
            </div>
            <div className="grid__col grid__col--size14">
              <a href="/#" className="accordion__trigger js-accordion-trigger">
                View
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="accordion__body accordion__body--alt">
        <ul className="widgets-pricing widgets-pricing--alt">
          <li className="widget">
            <div className="widget__inner">
              <div className="widget__head">
                <h3 className="widget__title">CORE</h3>
                <p>$99</p>
                <span>per month, billed annually</span>
              </div>

              <div className="widget__body">
                <ul className="list-features list-features--alt">
                  <li>2,500 messages included*</li>
                  <li>1 Unique Phone Number</li>
                  <li>Unlimited contacts</li>
                  <li>Unlimited keywords</li>
                  <li>Slack Integration</li>
                  <li>Microsoft Teams Integration</li>
                  <li>Zapier Integration</li>
                  <li>Campaigns</li>
                  <li>Full API Access</li>
                </ul>
              </div>

              <div className="widget__actions">
                <a
                  href="/#"
                  className="btn-plain btn-plain--blue btn-plain--alt btn-plain--size1"
                >
                  Get Started
                </a>
              </div>
            </div>
          </li>

          <li className="widget widget--offer">
            <div className="widget__inner">
              <div className="widget__popular-offer">
                <p>Most Popular</p>
                <img
                  src={ChatterPyImages.logoCircleShadow}
                  alt=""
                  width="74"
                  height="74"
                />
              </div>
              <div className="widget__head">
                <h3 className="widget__title">STANDARD</h3>
                <p>$199</p>
                <span>per month, billed annually</span>
              </div>

              <div className="widget__body">
                <ul className="list-features list-features--alt">
                  <li>5,000 messages included*</li>
                  <li>3 Unique Phone Numbers</li>
                  <li>Unlimited contacts</li>
                  <li>Unlimited keywords</li>
                  <li>Slack Integration</li>
                  <li>Microsoft Teams Integration</li>
                  <li>Zapier Integration</li>
                  <li>Campaigns</li>
                  <li>Full API Access</li>
                </ul>
              </div>

              <div className="widget__actions">
                <a
                  href="/#"
                  className="btn-plain btn-plain--blue btn-plain--alt btn-plain--size1"
                >
                  Get Started
                </a>
              </div>
            </div>
          </li>

          <li className="widget">
            <div className="widget__inner">
              <div className="widget__head">
                <h3 className="widget__title">PRO</h3>
                <p>$399</p>
                <span>per month, billed annually</span>
              </div>

              <div className="widget__body">
                <ul className="list-features list-features--alt">
                  <li>10,000 messages included*</li>
                  <li>10 Unique Phone Numbers</li>
                  <li>Unlimited contacts</li>
                  <li>Unlimited keywords</li>
                  <li>Slack Integration</li>
                  <li>Microsoft Teams Integration</li>
                  <li>Zapier Integration</li>
                  <li>Campaigns</li>
                  <li>Full API Access</li>
                </ul>
              </div>

              <div className="widget__actions">
                <a
                  href="/#"
                  className="btn-plain btn-plain--blue btn-plain--alt btn-plain--size1"
                >
                  Get Started
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
