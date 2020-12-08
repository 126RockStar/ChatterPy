// @flow
import * as React from 'react';

export default function SMSTesting(): React.Node {
  return (
    <section className="sms-testing padding-bottom padding-top bg-ash">
      <div className="container">
        <div className="section-header wow fadeInUp">
          <span className="cate">sms testing</span>
          <h2 className="title">Inquiry about our services</h2>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="testing-item wow fadeInUp" data-wow-delay=".3s">
              <h4 className="title">send us your SMS text</h4>
              <form name="test" className="testing-form" method="POST" netlify>
                <div className="form-group">
                  <input type="text" placeholder="Name" />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email" />
                </div>
                <div className="form-group w-100">
                  <input type="tel" placeholder="Phone" />
                </div>
                <div className="form-group w-100">
                  <textarea
                    placeholder="Message"
                    defaultValue={''}
                  />
                </div>
                <div className="form-group">
                  <input type="submit" defaultValue="Submit Now" />
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div className="testing-item wow fadeInUp" data-wow-delay=".3s">
              <h4 className="title">about our privacy</h4>
              <p>
                This is the SMS testing section{' '}
              </p>
              <ul className="bullet-list">
                <li>Vestibulum id rhoncus tempus</li>
                <li>Tellus fermentum a aenean</li>
                <li>By inquiring about services, you agree to receive a text message from one of our representatives
                about our services</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
