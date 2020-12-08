import * as React from 'react';

import ContactInfoBlock from './ContactInfoBlock';
import SocialMediaBlock from './SocialMediaBlock';

export default function HeaderTop(): React.Node {
  return (
    <div className="header-top d-none d-md-block bg-theme">
      <div className="container">
        <div className="header-top-wrapper">
          <div className="row">
            <div className="col-md-8">
              <ContactInfoBlock />
            </div>
            <div className="col-md-4 d-flex flex-wrap align-items-center justify-content-end">
              <SocialMediaBlock />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
