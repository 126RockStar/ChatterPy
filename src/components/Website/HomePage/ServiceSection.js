// @flow
import * as React from 'react';

export default function ServiceSection(): React.Node {
  return (
    <section className="service-section padding-bottom padding-top">
      <div className="container">
        <div className="section-header wow fadeInUp">
          <span className="cate">our service</span>
          <h2 className="title">What We Do</h2>
        </div>
        <div className="row justify-content-center mb-30-none">
          <div className="col-md-6 col-lg-4">
            <div
              className="service-item text-center wow fadeInUp"
              data-wow-delay=".3s"
            >
              <div className="service-thumb">
                <i className="flaticon flaticon-love" />
              </div>
              <div className="service-content">
                <h4 className="title">
                  <a href="#0">Email Parsing</a>
                </h4>
                <p>
                  We parse your emails and save your customer data for you!{' '}
                </p>
                <a href="#0">
                  Find Out More <i className="fas fa-caret-right" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div
              className="service-item text-center wow fadeInUp"
              data-wow-delay=".3s"
            >
              <div className="service-thumb">
                <i className="flaticon flaticon-sms" />
              </div>
              <div className="service-content">
                <h4 className="title">
                  <a href="#0">Automatic Replies</a>
                </h4>
                <p>
                 We set up auto texts to make it easy for you start a conversation with your customers{' '}
                </p>
                <a href="#0">
                  Find Out More <i className="fas fa-caret-right" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div
              className="service-item text-center wow fadeInUp"
              data-wow-delay=".3s"
            >
              <div className="service-thumb">
                <i className="flaticon flaticon-mic" />
              </div>
              <div className="service-content">
                <h4 className="title">
                  <a href="#0">Interactive Call Trees</a>
                </h4>
                <p>
                  We can integrate our services to your existing phone system where
                  you can send a custom text message right after your call ends {' '}
                </p>
                <a href="#0">
                  Find Out More <i className="fas fa-caret-right" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div
              className="service-item text-center wow fadeInUp"
              data-wow-delay=".3s"
            >
              <div className="service-thumb">
                <i className="flaticon flaticon-route" />
              </div>
              <div className="service-content">
                <h4 className="title">
                  <a href="#0">Reach Out to your customers anywhere</a>
                </h4>
                <p>
                  We make it possible for you to reach your customers anywhere and any
                  time with a custom text message {' '}
                </p>
                <a href="#0">
                  Find Out More <i className="fas fa-caret-right" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div
              className="service-item text-center wow fadeInUp"
              data-wow-delay=".3s"
            >
              <div className="service-thumb">
                <i className="flaticon flaticon-megaphone" />
              </div>
              <div className="service-content">
                <h4 className="title">
                  <a href="#0">Retarget your customer</a>
                </h4>
                <p>
                  Once your emails are parsed, you have customers information saved. You can easily retarget them!{' '}
                </p>
                <a href="#0">
                  Find Out More <i className="fas fa-caret-right" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div
              className="service-item text-center wow fadeInUp"
              data-wow-delay=".3s"
            >
              <div className="service-thumb">
                <i className="flaticon flaticon-paper-plane" />
              </div>
              <div className="service-content">
                <h4 className="title">
                  <a href="#0">Email Service</a>
                </h4>
                <p>
                  No other company integrates email and sms{' '}
                </p>
                <a href="#0">
                  Find Out More <i className="fas fa-caret-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
