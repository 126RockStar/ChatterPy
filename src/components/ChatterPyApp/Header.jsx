// @flow
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import $ from 'jquery';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import ChatterPyContext from './ChatterPyContext';
import ChatterPyDispatch from './ChatterPyDispatch';
import DropdownTrigger from './ui/DropdownTrigger';
import ChatterPyImages from '../../helpers/ChatterPyImages';
import icoSquare from '../../assets/images/temp/ico-square.png';
import type { PhoneNumber } from './types';
import parsePhoneNumber, { AsYouType } from 'libphonenumber-js'

type Props = {
  phoneNumbers: $ReadOnlyArray<PhoneNumber>,
};

export default function Header({
  phoneNumbers,
}: Props): React.Element<'header'> {
  const { allPhoneNumbers, selectedPhoneNumber } = React.useContext(
    ChatterPyContext,
  );
  const globalDispatch = React.useContext(ChatterPyDispatch);
  const phoneNumberOptions = React.useMemo(
    () =>
      phoneNumbers.map(number => ({
        value: number.phoneNumber,
        href: `tel:${number.phoneNumber}`,
      })),
    [phoneNumbers],
  );
  const location = useLocation();
  const onPhoneNumberSelect = (phoneNumber: string) => {
    globalDispatch({
      type: 'PHONE_NUMBER_SELECT',
      selectedPhoneNumber: phoneNumber,
    });
  };

  // load the jquery event handlers for when the sidebar icon is clicked
  // when in mobile screen size
  React.useEffect(() => {
    $('.js-nav-trigger').on('click', function (e) {
      e.preventDefault();
      let $this = $(this);

      $this.toggleClass('is-active').next().slideToggle();
    });

    $('.js-nav-trigger-left').on('click', function (e) {
      e.preventDefault();
      let $this = $(this);

      $this
        .toggleClass('is-active')
        .next()
        .toggleClass('is-active')
        .closest('.section')
        .find('.section__content')
        .toggleClass('is-active')
        .closest('body')
        .toggleClass('is-active');
    });

    $('.js-nav-trigger-left-header').on('click', function (e) {
      e.preventDefault();
      let $this = $(this);

      $this
        .closest('body')
        .addClass('is-active')
        .find('.section, .section-alt')
        .find('.nav-secondary, .nav-secondary-alt')
        .addClass('is-active')
        .closest('.section__aside')
        .siblings('.section__content')
        .addClass('is-active');
    });

    $('.js-nav-close').on('click', function (e) {
      e.preventDefault();
      let $this = $(this);

      $this
        .parent()
        .removeClass('is-active')
        .closest('.section__aside')
        .siblings()
        .removeClass('is-active')
        .closest('body')
        .removeClass('is-active');
    });
  }, []);

  let isChatPage = false;
  let chatsHeaderContents = null;
  let newChatIcon = null;

  // our mobile header contents is different for the Chats app
  if (location.pathname === '/app/chat') {
    isChatPage = true;
    chatsHeaderContents = (
      <DropdownTrigger
        className="visible-xs-inline-block hidden dropdown--style-2"
        trigger="All"
        hideCaret
        options={[
          'Inbox',
          'Reminders',
          'Closed',
          'Unread',
          {
            value: '',
            contents: (): React.Element<'li'> => (
              <li key="cancel" className="dropdown__cancel">
                <a href="#" className="js-dropdown-close">
                  Cancel
                </a>
              </li>
            ),
          },
        ]}
      />
    );

    newChatIcon = (
      <a
        href="#"
        id="header--new-chat-icon"
        className="link-add-new visible-xs-inline-block hidden"
      >
        <img
          src={ChatterPyImages.Icons.newChat}
          alt=""
          width="24"
          height="24"
        />
      </a>
    );
  }

  const headerClassName = classNames('header header--alt', {
    'header--chats': isChatPage,
  });

  return (
    <header className={headerClassName}>
      <div className="shell shell--fluid">
        <div className="header__inner">
          <a
            href="/#"
            className="nav-trigger nav-trigger--alt js-nav-trigger-left-header"
          >
            <span />
            <span />
            <span />
          </a>

          <div className="header__content">
            {chatsHeaderContents}
            <a href="/#" className="logo">
              <img
                className="hidden-xs"
                src={ChatterPyImages.logo}
                alt=""
                width="171"
                height="64"
              />
              {!isChatPage && (
                <img
                  className="visible-xs-inline-block hidden"
                  src={ChatterPyImages.logoWithShadow}
                  alt=""
                  width="141"
                  height="61"
                />
              )}
            </a>

            <DropdownTrigger
              key={allPhoneNumbers.length}
              hideCaret
              className="hidden-xs"
              trigger={
                <img
                  src={ChatterPyImages.Icons.dropdown}
                  alt=""
                  width="14"
                  height="14"
                />
              }
              options={phoneNumberOptions}
              onSelect={onPhoneNumberSelect}
              renderSelectedItem={value => {
                const phone = parsePhoneNumber('+1'+value)
                let phone_num
                if (phone) {
                  phone_num = phone.formatInternational()
                }
                return (
                <span style={{ color: '#ff8500', textDecoration: 'underline' }}>
                  {phone_num}
                </span>
              )}}
              initialSelectedItem={
                selectedPhoneNumber
                  ? selectedPhoneNumber.phoneNumber
                  : undefined
              }
            />
          </div>
          {newChatIcon}

          <div className="header__nav hidden-xs">
            <a
              href="/#"
              className="nav-trigger nav-trigger--cog js-nav-trigger"
            >
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
              >
                <path d="M 12.0625 0 C 9.773438 0 9.8125 0.21875 9.8125 0.21875 C 9.539063 1.539063 9.253906 2.433594 9.0625 2.96875 C 7.898438 3.351563 6.824219 3.949219 5.90625 4.71875 C 5.351563 4.609375 4.457031 4.40625 3.21875 3.96875 C 3.21875 3.96875 3.050781 3.824219 1.875 5.8125 C 0.695313 7.800781 0.875 7.90625 0.875 7.90625 C 1.789063 8.765625 2.386719 9.425781 2.75 9.875 C 2.59375 10.558594 2.5 11.269531 2.5 12 C 2.5 12.664063 2.558594 13.3125 2.6875 13.9375 C 2.316406 14.378906 1.707031 15.042969 0.78125 15.875 C 0.78125 15.875 0.613281 15.957031 1.75 17.96875 C 2.886719 19.980469 3.03125 19.84375 3.03125 19.84375 C 4.28125 19.429688 5.191406 19.253906 5.75 19.15625 C 6.664063 19.960938 7.730469 20.5625 8.90625 20.96875 C 9.101563 21.496094 9.40625 22.414063 9.6875 23.78125 C 9.6875 23.78125 9.652344 24 11.9375 24 C 14.222656 24 14.21875 23.78125 14.21875 23.78125 C 14.492188 22.464844 14.742188 21.566406 14.9375 21.03125 C 16.101563 20.648438 17.175781 20.050781 18.09375 19.28125 C 18.648438 19.390625 19.542969 19.59375 20.78125 20.03125 C 20.78125 20.03125 20.945313 20.175781 22.125 18.1875 C 23.300781 16.199219 23.125 16.09375 23.125 16.09375 C 22.210938 15.234375 21.613281 14.574219 21.25 14.125 C 21.40625 13.4375 21.5 12.730469 21.5 12 C 21.5 11.335938 21.441406 10.6875 21.3125 10.0625 C 21.683594 9.621094 22.292969 8.957031 23.21875 8.125 C 23.21875 8.125 23.386719 8.042969 22.25 6.03125 C 21.113281 4.019531 20.96875 4.15625 20.96875 4.15625 C 19.71875 4.570313 18.808594 4.746094 18.25 4.84375 C 17.335938 4.042969 16.269531 3.4375 15.09375 3.03125 C 14.902344 2.503906 14.59375 1.585938 14.3125 0.21875 C 14.3125 0.21875 14.347656 0 12.0625 0 Z M 12 4 C 16.417969 4 20 7.582031 20 12 C 20 16.417969 16.417969 20 12 20 C 7.582031 20 4 16.417969 4 12 C 4 7.582031 7.582031 4 12 4 Z M 12 5 C 8.132813 5 5 8.132813 5 12 C 5 15.867188 8.132813 19 12 19 C 15.867188 19 19 15.867188 19 12 C 19 8.132813 15.867188 5 12 5 Z M 12 8 C 14.210938 8 16 9.789063 16 12 C 16 14.210938 14.210938 16 12 16 C 9.789063 16 8 14.210938 8 12 C 8 9.789063 9.789063 8 12 8 Z" />
              </svg>
            </a>

            <nav className="nav">
              <ul>
                <li>
                  <a href="/#">
                    <strong>
                      CREDITS
                      <br /> 1450
                    </strong>
                  </a>
                </li>

                <li>
                  <a href="/#">
                    <img src={icoSquare} alt="" width="34" height="33" />
                  </a>
                </li>

                <li>
                  <DropdownTrigger
                    hideCaret
                    usePointer
                    trigger={
                      <img
                        src={ChatterPyImages.Icons.profile}
                        alt=""
                        width="62"
                        height="62"
                      />
                    }
                    triggerClassName="dropdown__trigger--user"
                    options={[
                      'Profile',
                      'Invite People',
                      'Settings',
                      'Feedback',
                    ]}
                    footer="SIGN OUT"
                  />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
