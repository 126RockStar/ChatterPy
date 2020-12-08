// @flow
import * as React from 'react';
import classNames from 'classnames';
import $ from 'jquery';

import type { Contact } from '../../types';

type Props = {
  nodeRef?: { current: ?HTMLDivElement },
  onRequestClose: () => void,
  show: boolean,
  contact: Contact,
};

export default function ContactInfoPanel({
  contact,
  nodeRef,
  onRequestClose,
  show,
}: Props): React.Element<'div'> {
  React.useEffect(() => {
    $('.js-tabs .tabs__nav a').on('click', function (event) {
      event.preventDefault();
      let currentClass = 'is-current';
      let $tabLink = $(this);
      let $targetTab = $($tabLink.attr('href'));

      $('.tab.is-current').addClass('translating');

      setTimeout(function () {
        $('.tab.is-current').removeClass('translating');

        $tabLink
          .parent()
          .add($targetTab)
          .addClass(currentClass)
          .siblings()
          .removeClass(currentClass)
          .removeClass('translating-in');

        setTimeout(function () {
          $('.tab.is-current').addClass('translating-in');
        }, 10);
      }, 500);
    });

    $('.js-add-item').on('click', function (e) {
      e.preventDefault();
      let $this = $(this);
      let $appendContainer = $this.closest('.js-append-container');

      $appendContainer.each(function () {
        let appendElementCount = $(this).find('.js-append-element').length;

        $(this)
          .find('.js-append-element:first')
          .each(function () {
            $(this)
              .clone()
              .appendTo($appendContainer)
              .find('span')
              .text(appendElementCount + 1)
              .closest('.js-append-element');
          });
      });
    });
  }, []);

  const className = classNames('chats__contact-menu js-info-content');
  return (
    <div
      className={className}
      ref={nodeRef}
      style={{
        flex: show ? 1 : 0,
        width: show ? '100%' : 0,
        transition: 'width 0.4s, opacity 0.4s, margin 0.4s, flex 0.4s',
        marginRight: 'unset',
        visibility: 'visible',
        opacity: show ? 1 : 0,
      }}
    >
      <div className="chats__contact-menu-head">
        <div
          role="button"
          className="chats__contact-menu-close js-info-close"
          onClick={onRequestClose}
        >
          X
        </div>
        <h3>Contact Info</h3>
      </div>

      <div className="chats__contact-menu-body">
        <div className="chat chat--single chat--single-big">
          <div className="chat__inner">
            <div className="chat__content">
              <div className="chat__image">
                <img
                  src="assets/images/temp/profile-pic-top.png"
                  alt=""
                  width="100"
                  height="100"
                />
              </div>
              <div className="chat__content-inner">
                <h4>
                  {contact.firstName} {contact.lastName}
                </h4>
                <a href={`tel:${contact.phoneNumber}`}>{contact.phoneNumber}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="tabs-info js-tabs">
          <div className="tabs__head">
            <nav className="tabs__nav">
              <ul>
                <li className="is-current">
                  <a href="#/tab-1">Contact Info</a>
                </li>

                <li>
                  <a href="/#tab-2">Media</a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="tabs__body">
            <div className="tab is-current translating-in" id="tab-1">
              <div className="tab__inner">
                <div className="tab__content">
                  <div className="tab__row">
                    <strong>Tags:</strong>

                    <div className="tab__row-items js-append-container">
                      <a
                        href="/#"
                        className="tab__link-add link-add-more js-add-item"
                      >
                        +
                      </a>

                      <div className="tab__tags js-append-element">
                        <p>Tags</p>
                      </div>

                      <div className="tab__tags js-append-element">
                        <p>Tags</p>
                      </div>

                      <div className="tab__tags js-append-element">
                        <p>Tags</p>
                      </div>
                    </div>
                  </div>

                  <div className="tab__row tab__row--fields">
                    <strong>Fields:</strong>

                    <div className="tab__row-items js-append-container">
                      <a
                        href="/#"
                        className="tab__link-add link-add-more js-add-item"
                      >
                        +
                      </a>

                      <div className="tab__fields js-append-element">
                        <p>
                          Field Name <span>1</span>
                        </p>
                      </div>

                      <div className="tab__fields js-append-element">
                        <p>
                          Field Name <span>2</span>
                        </p>
                      </div>

                      <div className="tab__fields js-append-element">
                        <p>
                          Field Name <span>3</span>
                        </p>
                      </div>

                      <div className="tab__fields js-append-element">
                        <p>
                          Field Name <span>4</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="tab__row">
                    <strong>Notes:</strong>
                    <textarea
                      className="tab__textarea"
                      name="tab-textarea"
                      id="tab-textarea"
                    ></textarea>
                  </div>
                </div>

                <div className="tab__actions tab__actions--alt">
                  <a href="/#" className="tab__btn tab__btn--alt">
                    <img
                      src="assets/images/temp/ico-arrow-top@2x.png"
                      alt=""
                      width="15"
                      height="14"
                    />
                    <span>Export Chat</span>
                  </a>

                  <a
                    href="/#"
                    className="tab__btn tab__btn--alt tab__btn--alt-red"
                  >
                    <img
                      src="assets/images/temp/ico-block@2x.png"
                      alt=""
                      width="17"
                      height="18"
                    />

                    <span>Block</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="tab" id="tab-2">
              <div className="tab__inner">
                <div className="tab__content tab__content--alt">
                  <a href="/#" className="tab__btn tab__btn--plain">
                    <span>
                      <img
                        src="assets/images/temp/ico-camera.png"
                        alt=""
                        width="26"
                        height="22"
                      />
                      Photos
                    </span>
                  </a>

                  <a href="/#" className="tab__btn tab__btn--plain">
                    <span>
                      <img
                        src="assets/images/temp/ico-doc.png"
                        alt=""
                        width="23"
                        height="27"
                      />
                      Documents
                    </span>
                  </a>
                </div>

                <div className="tab__actions">
                  <a href="/#" className="tab__btn">
                    Settings
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
