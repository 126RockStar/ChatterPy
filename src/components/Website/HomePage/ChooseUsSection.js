// @flow
import * as React from 'react';

export default function ChooseUsSection(): React.Node {
  return (
    <section className="choose-us-section padding-top padding-bottom">
      <div className="container">
        <div className="section-header wow fadeInUp">
          <span className="cate">our feature</span>
          <h2 className="title">why choose us</h2>
        </div>
        <div className="row mb-30-none justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div
              className="choose-item text-center wow fadeInUp"
              data-wow-delay=".3s"
            >
              <div className="choose-thumb">
                <i className="flaticon flaticon-global" />
              </div>
              <div className="choose-content">
                <h5 className="title">Dedicated Support Team</h5>
              </div>

              <p>
                  <br></br>We are working around the clock to make sure our clients are satisfied with our services.
                </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div
              className="choose-item text-center wow fadeInUp"
              data-wow-delay=".3s"
            >
              <div className="choose-thumb">
                <i className="flaticon flaticon-ui" />
              </div>
              <div className="choose-content">
                <h5 className="title">Easy to use software with little to no learning curve</h5>
              </div>
               <p>
                  <br></br>Our developers created the ChatterPy software to be easy and intuitive.
                </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div
              className="choose-item text-center wow fadeInUp"
              data-wow-delay=".3s"
            >
              <div className="choose-thumb">
                <i className="flaticon flaticon-clock" />
              </div>
              <div className="choose-content">
                <h5 className="title">Affordable solutions for all industries</h5>

              </div>
              <p>
                  <br></br>ChatterPy can be used in all types of businesses and won't break the bank.
                  We keep our prices low to build a long lasting relationship with our clients.
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
