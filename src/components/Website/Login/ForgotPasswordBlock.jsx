// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordBlock(): React.Node {
  return (
    <div className="forget-pass-group d-flex flex-wrap justify-content-between">
      <div className="forget-pass">
        <p>
          <a href="#0">forgot password</a>
        </p>
      </div>
      <div className="no-account">
        <p>
          Have Not Account in Here? <Link to="/signup">Sign-Up</Link>
        </p>
      </div>
    </div>
  );
}
