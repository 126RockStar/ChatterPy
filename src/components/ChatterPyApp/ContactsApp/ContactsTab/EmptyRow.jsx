// @flow
import * as React from 'react';

export default function EmptyRow(): React.Node {
  return (
    <div className="section__row grid">
      <div className="section__row-item grid__col grid__col--size7" />
      <div className="section__row-item grid__col grid__col--size8" />
      <div className="section__row-item grid__col grid__col--size10 hidden-xs" />
      <div className="section__row-item grid__col grid__col--size9" />
      <div className="section__row-item grid__col grid__col" />
    </div>
  );
}
