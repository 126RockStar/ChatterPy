// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

import AccountCreationForm from './AccountCreationForm';
import Breadcrumb from '../ui/Breadcrumb';
import HeroArea from '../ui/HeroArea';
import SponsorSection from '../common/SponsorSection';

export default function SignUp(): React.Node {
  return (
    <>
      <HeroArea text="my account" />
      <Breadcrumb currentSection="sign-up" />
      <section className="account-section padding-top padding-bottom bg_img bg_xxl_contain bg_right_bottom">
        <div className="container">
          <div className="account-wrapper">
            <div className="account-area">
              <h3 className="account-title">create new account</h3>
              <AccountCreationForm />
              <div className="forget-pass-group text-center m-0 mt-md-3">
                <p>
                  Already have an Account? <Link to="/login">Sign-In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SponsorSection />
    </>
  );
}
