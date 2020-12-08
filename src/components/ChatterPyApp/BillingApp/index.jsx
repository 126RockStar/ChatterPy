// @flow
import * as React from 'react';

import BillingInfoBlock from './BillingInfoBlock';
import BillingHistoryBlock from './BillingHistoryBlock';
import CurrentPlanBlock from './CurrentPlanBlock';
import useJQueryAccordion from './useJQueryAccordion';
import { ALL_BILLING_HISTORY } from '../seedData';

export default function BillingApp(): React.Node {
  useJQueryAccordion();

  return (
    <div className="section__content">
      <div className="section__content-head">
        <h3>Plan & Billing</h3>
      </div>

      <div className="section__content-body">
        <div className="accordion js-accordion">
          <CurrentPlanBlock />
          <BillingInfoBlock />
          <BillingHistoryBlock billingHistoryItems={ALL_BILLING_HISTORY} />
        </div>
      </div>
    </div>
  );
}
