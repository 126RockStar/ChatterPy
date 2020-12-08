// @flow
import * as React from 'react';

import WebsiteImages from '../../../helpers/WebsiteImages';

export default function BlogSelection(): React.Node {
  return (
    <section className="blog-section padding-bottom padding-top">
      <div className="container">
        <div className="section-header wow fadeInUp">
          <span className="cate">our blog post</span>
          <h2 className="title">the latest post & tips</h2>
        </div>
        <div className="row mb-30-none justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="post-item wow fadeInUp" data-wow-delay=".3s">
              <div className="post-item">
                <div className="post-thumb">
                  <a href="blog.html">
                    <img src={WebsiteImages.Blogs.blog1} alt="blog" />
                  </a>
                  <div className="post-date">
                    <span>22</span>
                    <span>dec</span>
                  </div>
                </div>
                <div className="post-content">
                  <h4 className="title">
                    <a href="blog.html">Business ipsum dolor cursus amet.</a>
                  </h4>
                  <p>
                    pede augue peltesqvolpegesed sed. Et neque
                    rhonctritiqultieam nunc, vitae consectetueMauorbi aenean non
                    maecenas
                  </p>
                  <a className="read-more" href="blog-details.html">
                    read More <i className="fas fa-caret-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="post-item wow fadeInUp" data-wow-delay=".3s">
              <div className="post-item">
                <div className="post-thumb">
                  <a href="blog.html">
                    <img src={WebsiteImages.Blogs.blog2} alt="blog" />
                  </a>
                  <div className="post-date">
                    <span>28</span>
                    <span>dec</span>
                  </div>
                </div>
                <div className="post-content">
                  <h4 className="title">
                    <a href="blog.html">
                      Ectus aliquet nunc est massa nunc placerat
                    </a>
                  </h4>
                  <p>
                    pede augue peltesqvolpegesed sed. Et neque
                    rhonctritiqultieam nunc, vitae consectetueMauorbi aenean non
                    maecenas
                  </p>
                  <a className="read-more" href="blog-details.html">
                    Read More <i className="fas fa-caret-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="post-item wow fadeInUp" data-wow-delay=".3s">
              <div className="post-item">
                <div className="post-thumb">
                  <a href="blog.html">
                    <img src={WebsiteImages.Blogs.blog3} alt="blog" />
                  </a>
                  <div className="post-date">
                    <span>31</span>
                    <span>dec</span>
                  </div>
                </div>
                <div className="post-content">
                  <h4 className="title">
                    <a href="blog.html">Condimentum magni velit mperdiet</a>
                  </h4>
                  <p>
                    pede augue peltesqvolpegesed sed. Et neque
                    rhonctritiqultieam nunc, vitae consectetueMauorbi aenean non
                    maecenas
                  </p>
                  <a className="read-more" href="blog-details.html">
                    Read More <i className="fas fa-caret-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
