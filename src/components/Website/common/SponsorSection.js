// @flow
import * as React from 'react';

import SponsorItem from './SponsorItem';
import WebsiteImages from '../../../helpers/WebsiteImages';

const SPONSOR_IMAGE_SRCS = [
  WebsiteImages.Sponsors.sponsor1,
  WebsiteImages.Sponsors.sponsor2,
  WebsiteImages.Sponsors.sponsor3,
  WebsiteImages.Sponsors.sponsor4,
  WebsiteImages.Sponsors.sponsor5,
  WebsiteImages.Sponsors.sponsor6,
  WebsiteImages.Sponsors.sponsor7,
  WebsiteImages.Sponsors.sponsor8,
];

const SPONSOR_IMAGES = SPONSOR_IMAGE_SRCS.map(src => (
  <SponsorItem key={src} src={src} />
));

export default function Sponsors(): React.Node {
  React.useEffect(() => {
    new window.Swiper('.sponsor-slider', {
      slidesPerView: 6,
      loop: true,
      breakpoints: {
        // $FlowExpectedError[unsupported-syntax]
        1024: {
          slidesPerView: 5,
        },
        // $FlowExpectedError[unsupported-syntax]
        767: {
          slidesPerView: 3,
        },
        // $FlowExpectedError[unsupported-syntax]
        575: {
          slidesPerView: 2,
        },
        // $FlowExpectedError[unsupported-syntax]
        400: {
          slidesPerView: 1,
        },
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    });
  }, []);

  return (
    <div className="sponsor-section bg-f3 padding-bottom padding-top">
      <div className="container">
        <div className="sponsor-slider">
          <div className="swiper-wrapper">{SPONSOR_IMAGES}</div>
        </div>
      </div>
    </div>
  );
}
