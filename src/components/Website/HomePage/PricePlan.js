// @flow
import * as React from 'react';

export default function PricePlan(): React.Node {
  return (
    <section className="price-section padding-top padding-bottom" id="pricing">
      <div className="container">
        <div className="section-header wow fadeInUp">
          <span className="cate">pricing plan</span>
          <h2 className="title">Our Prices</h2>
        </div>
        <div className="row mb-30-none justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="price-item wow fadeInUp" data-wow-delay=".3s">
              <div className="price-header">
                <span className="category">Essential</span>
                <h3 className="sub-title">
                  $99<span>Per Month</span>
                </h3>
              </div>
              <ul>
                <li>
                  <span>Messages</span>2,500 Credits
                </li>
                <li>
                  <span>Templates</span> Yes
                </li>
                <li>
                  <span>Automations</span>Yes
                </li>
                <li>
                  <span>Smart Inbox - Auto Text</span>No
                </li>
                <li>
                  <span>Zapier Integration</span>No
                </li>
                <li>
                  <a href="https://zfrmz.com/bsBRXf1miGD29AryuXJ0" className="custom-button">
                    try now
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="price-item wow fadeInUp" data-wow-delay=".3s">
              <div className="price-header">
                <span className="category">Pro</span>
                <h3 className="sub-title">
                  $199<span>per month</span>
                </h3>
              </div>
              <ul>
                <li>
                  <span>Messages</span>5,000 Credits
                </li>
                <li>
                  <span>Templates</span>Yes
                </li>
                <li>
                  <span>Automation</span>Yes
                </li>
                <li>
                  <span>Smart Inbox - Auto Text</span>No
                </li>
                <li>
                  <span>Zapier Integration</span>Yes
                </li>
                <li>
                  <a href=" https://zfrmz.com/bsBRXf1miGD29AryuXJ0" className="custom-button">
                    try now
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="price-item wow fadeInUp" data-wow-delay=".3s">
              <div className="price-header">
                <span className="category">Enterprise</span>
                <h3 className="sub-title">
                  $399<span>per month</span>
                </h3>
              </div>
              <ul>
                <li>
                  <span>Messages</span>10,000 Credits
                </li>
                <li>
                  <span>Templates</span>Yes
                </li>
                <li>
                  <span>Automations</span>Yes
                </li>
                <li>
                  <span>Smart Inbox - Auto Text</span>Yes
                </li>
                <li>
                  <span>Zapier Integration</span>Yes
                </li>
                <li>
                  <a href=" https://zfrmz.com/bsBRXf1miGD29AryuXJ0" className="custom-button">
                    try now
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
