// @flow
import * as React from 'react';
import WebsiteImages from '../../../helpers/WebsiteImages';

export default function Banner(): React.Node {
  return (
    <section className="banner-section">
      <div className="container">
        <div className="banner-content  wow fadeInUp" data-wow-delay=".3s">
          <span className="category">Build a better customer experience</span>
          <h1 className="title">
            reach more customers with faster, more reliable SMS messaging
          </h1>
          <div className="video-button-group">
            <a href="https://zfrmz.com/bsBRXf1miGD29AryuXJ0" className="custom-button active">
              Contact Us
            </a>
            <div className="v-button">
              <a
                data-rel="lightcase:myCollection"
                href="https://www.youtube.com/watch?v=gti1X5vEfHU&ab_channel=ChatterPy"
                className="video-button"
              >
                <i className="flaticon flaticon-play-button" />
              </a>
            </div>
          </div>
          <div className="round-shape"></div>
        </div>
      </div>
      <div className="maps-shape bg_img bg-contain" />
      <div className="shape-thumb">
        <img
          className="wow slideInUp"
          data-wow-delay=".7s"
          src={WebsiteImages.imageGif}
          alt="banner"
        />
      </div>
    </section>
  );
}
