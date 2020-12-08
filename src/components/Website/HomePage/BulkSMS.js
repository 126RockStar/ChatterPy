// @flow
import * as React from 'react';

import WebsiteImages from '../../../helpers/WebsiteImages';

export default function BulkSMS(): React.Node {
  return (
    <section className="bulk-sms padding-top">
      <div className="container">
        <div className="row flex-wrap-reverse align-items-center">
          <div className="col-lg-6">
            <div
              className="bulk-content text-center text-sm-left wow fadeIn"
              data-wow-delay=".3s"
            >
              <span>Welcome to ChatterPy</span>
              <h2 className="title">Enabling texting for businesses</h2>
              <p>
                ChatterPy is the next generation of business texting. Reach your customers or clients much
                more effectively and more conveniently with ChatterPy
              </p>
              <a href="https://zfrmz.com/bsBRXf1miGD29AryuXJ0" className="custom-button active">
                sign-up & start
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="bulk-thumb wow slideInRight">
              <img src={WebsiteImages.chatterpyGif} alt="bulk" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
