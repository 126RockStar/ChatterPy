// @flow
import * as React from 'react';

import type { BillingHistoryItem } from '../types';

type Props = {
  item: BillingHistoryItem,
};

export default function BillingHistoryRow({ item }: Props): React.Node {
  return (
    <div className="grid">
      <div className="grid__col grid__col--size13">
        <p>{item.date.format('MM/DD/YYYY')}</p>
      </div>
      <div className="grid__col">
        <p>${item.amount}</p>
      </div>
    </div>
  );
}
