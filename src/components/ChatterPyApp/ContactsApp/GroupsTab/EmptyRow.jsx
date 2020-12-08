// @flow
import * as React from 'react';

export default function EmptyRow(): React.Node {
  return (
    <div className="section__row grid">
      <div className="section__row-item grid__col grid__col--size7"></div>
      <div className="section__row-item grid__col grid__col--size11"></div>
      <div className="section__row-item grid__col grid__col"></div>
      <div className="section__row-item grid__col grid__col--size12"></div>
    </div>
  );
}
