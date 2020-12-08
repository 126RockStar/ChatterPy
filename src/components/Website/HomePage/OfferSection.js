// @flow
import * as React from 'react';

import WebsiteImages from '../../../helpers/WebsiteImages';

export default function OfferSection(): React.Node {
  return (
    <section className="offer-section bg-ash padding-top padding-bottom">
      <div className="container">
        <div className="section-header wow fadeInUp">
          <span className="cate">our offer</span>
          <h2 className="title">what we offer</h2>
        </div>
      </div>
      <div className="container mw-lg-100">
        <div className="row align-items-center flex-wrap-reverse">
          <div className="col-lg-6">
            <div className="left-side-offer wow fadeInUp" data-wow-delay=".3s">
              <h4 className="title">
                get our best offer for your better business
              </h4>
              <p>
                This is the offer section
              </p>
              <ul>
                <li>One</li>
                <li>Two</li>
                <li>Three</li>
                <li>
                  Four
                </li>
                <li>Five</li>
              </ul>
              <p>
               six
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="right-side-offer wow slideInRight"
              data-wow-delay=".3s"
            >
              <img src={WebsiteImages.whatWeOfferImg} alt="offer" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
