// @flow
import * as React from 'react';

import Breadcrumb from '../ui/Breadcrumb';
import ForgotPasswordBlock from './ForgotPasswordBlock';
import HeroArea from '../ui/HeroArea';
import LoginForm from './LoginForm';
import SponsorSection from '../common/SponsorSection';

export default function Login(): React.Node {
  return (
    <>
      <HeroArea text="my account" />
      <Breadcrumb currentSection="sign-in" />
      <section className="account-section padding-top padding-bottom bg_img bg_right_bottom">
        <div className="account-wrapper">
          <div className="account-area">
            <h3 className="account-title">sign-in your account</h3>
            <LoginForm />
            <ForgotPasswordBlock />
          </div>
        </div>
      </section>
      <SponsorSection />
    </>
  );
}
