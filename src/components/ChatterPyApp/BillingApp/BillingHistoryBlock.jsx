// @flow
import * as React from 'react';

import BillingHistoryRow from './BillingHistoryRow';
import type { BillingHistoryItem } from '../types';

type Props = {
  billingHistoryItems: $ReadOnlyArray<BillingHistoryItem>,
};

export default function BillingHistoryBlock({
  billingHistoryItems,
}: Props): React.Node {
  const [firstItem, ...restOfItems] = billingHistoryItems;
  return (
    <div className="accordion__section">
      <div className="accordion__head">
        <h4 className="hidden-xs">billing history</h4>

        <div className="accordion__head-content accordion__head-content--alt">
          <strong className="hidden visible-xs-block">Billing History</strong>

          <div className="grid hidden-xs">
            <div className="grid__col grid__col--size13">
              <strong>Date</strong>
            </div>
            <div className="grid__col">
              <strong>Amount</strong>
            </div>
          </div>

          <div className="grid hidden-xs">
            <div className="grid__col grid__col--size13">
              <strong className="hidden visible-xs-block">Date</strong>
              <p>{firstItem.date.format('MM/DD/YYYY')}</p>
            </div>

            <div className="grid__col">
              <strong className="hidden visible-xs-block">Amount</strong>
              <p>${firstItem.amount}</p>
            </div>

            <div className="grid__col grid__col--size14">
              <a href="/#" className="accordion__trigger js-accordion-trigger">
                View
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden visible-xs-block">
        <div className="grid" style={{ marginTop: 10 }}>
          <div
            className="grid__col grid__col--size13"
            style={{ marginLeft: 8 }}
          >
            <strong>Date</strong>
          </div>

          <div className="grid__col" style={{ marginLeft: -7 }}>
            <strong>Amount</strong>
          </div>
        </div>

        <div className="grid accordion__grid">
          <div className="grid__col grid__col--size13">
            <p>{firstItem.date.format('MM/DD/YYYY')}</p>
          </div>

          <div className="grid__col">
            <p>${firstItem.amount}</p>
          </div>

          <div className="grid__col grid__col--size14">
            <a href="/#" className="accordion__trigger js-accordion-trigger">
              View
            </a>
          </div>
        </div>
      </div>

      <div className="accordion__body accordion__head-content accordion__head-content--alt">
        {restOfItems.map(item => (
          <BillingHistoryRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
