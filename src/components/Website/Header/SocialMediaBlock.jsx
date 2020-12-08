// @flow
import * as React from 'react';

export default function SocialMediaBlock(): React.Node {
  return (
    <ul className="social">
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
  );
}
