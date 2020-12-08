// @flow
import * as React from 'react';

import WebsiteImages from '../../../helpers/WebsiteImages';

export default function ClientSection(): React.Node {
  React.useLayoutEffect(() => {
    new window.Swiper('.client-say-slider', {
      loop: true,
      autoplay: {
        delay: 6500,
        disableOnInteraction: true,
      },
      pagination: {
        el: '.client-pagination',
        clickable: true,
      },
    });
  }, []);

  return (
    <section className="client-say padding-bottom padding-top">
      <div className="container">
        <div className="section-header wow fadeInUp">
          <span className="cate">client feedback</span>
          <h2 className="title">What Our Clients Say About Us</h2>
        </div>
        <div className="client-say-slider">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="client-item">
                <div className="client-thumb">
                  <a href="#0">
                    <img src={WebsiteImages.Clients.yele} alt="client" />
                  </a>
                </div>
                <div className="client-content">
                  <h4 className="title">
                    <a href="#0">Yele Yang</a>
                  </h4>
                  <span>MN Property Nerds</span>
                  <blockquote>
                    Before ChatterPy I was manually responding to all our prospective rental clients through email
                    and it was taking up a bunch of my time with little results.
                    As soon as we implemented the auto response texts I was able to focus on more important things
                    and we are renting our properties so much faster.
                  </blockquote>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="client-item">
                <div className="client-thumb">
                  <a href="#0">
                    <img src={WebsiteImages.Clients.jeff} alt="client" />
                  </a>
                </div>
                <div className="client-content">
                  <h4 className="title">
                    <a href="#0">Jeff Lowe</a>
                  </h4>
                  <span>Insurance Agent</span>
                  <blockquote>
                    Being able to use ChatterPy has been a great tool for my insurance agency. My team is able to follow up with late pays,
                    send reminders to current clients, and reach out to new clients all in one easy to use system.
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
          <div className="client-pagination" />
        </div>
      </div>
    </section>
  );
}
