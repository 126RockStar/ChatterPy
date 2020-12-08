// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  currentSection: string,
};

export default function Breadcrumb({ currentSection }: Props): React.Node {
  return (
    <div className="breadcrumb-section">
      <div className="container">
        <ul className="breadcrumb">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>{currentSection}</li>
        </ul>
      </div>
    </div>
  );
}
