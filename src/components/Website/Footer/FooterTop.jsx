// @flow
import * as React from 'react';

import FooterAboutUs from './FooterAboutUs';
import FooterLinksBlock from './FooterLinksBlock';

const BULK_SMS_LINKS = [
  { href: '#', label: 'Email Parsing' },
  { href: '#', label: 'Automatic Replies' },
  { href: '#', label: 'Interactive Call Trees' },
  { href: '#', label: 'Reach Out to Your Customer' },
  { href: '#', label: 'Retarget Your Customer or Client' },
];

const COMPANY_LINKS = [
  { href: '#', label: 'Property Management' },
  { href: '#', label: 'Real Estate' },
  { href: '#', label: 'Retail' },
  { href: '#', label: 'Automotive' },
  { href: '#', label: 'Insurance' },
  { href: '#', label: 'Fitness'},
];

const PARTNER_LINKS = [
  { href: '#', label: 'About Us' },
  { href: '#', label: 'Pricing' },
  { href: '#', label: 'FAQ' },
];

export default function FooterTop(): React.Node {
  return (
    <div className="footer-top padding-top padding-bottom">
      <div className="container">
        <div className="row mb-50-none">
          <div className="col-sm-6 col-lg-3">
            <FooterLinksBlock title="Services" links={BULK_SMS_LINKS} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FooterLinksBlock title="Industries" links={COMPANY_LINKS} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FooterLinksBlock title="Company" links={PARTNER_LINKS} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FooterAboutUs />
          </div>
        </div>
      </div>
    </div>
  );
}
