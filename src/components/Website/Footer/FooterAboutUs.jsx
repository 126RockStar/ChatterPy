// @flow
import * as React from 'react';

export default function FooterAboutUs(): React.Node {
  return (
    <div className="footer-widget footer-about">
      <h5 className="title">about us</h5>
      <p>
        We offer the next generation of business to consumer texting services.
      </p>
      <ul className="footer-social">
        <li>
          <a href="https://www.facebook.com/chatterpy">
            <i className="fab fa-facebook-f" />
          </a>
        </li>
        <li>
          <a href="https://www.twitter.com/chatterpy">
            <i className="fab fa-twitter" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/chatterpy">
            <i className="fab fa-instagram" />
          </a>
        </li>
      </ul>
    </div>
  );
}
