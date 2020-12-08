// @flow
import * as React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';

import HeaderMenuItem from './HeaderMenuItem';
import LanguageDropdown from './LanguageDropdown';
import WebsiteImages from '../../../helpers/WebsiteImages';

const MENU_ITEM_DATA = [
  {
    itemLabel: 'Home',
    submenuItems: [
      { href: '/', label: 'Home' }
    ],
  },
  {
    itemLabel: 'Company',
    submenuItems: [
      { href: 'about.html', label: 'About Us' },
      {
        label: 'Case',
        submenu: [
          { href: 'case.html', label: 'Recent Case' },
          { href: 'case-details.html', label: 'Case Details' },
        ],
      },
      {
        label: 'Pages',
        submenu: [
          { href: '.', label: 'Price Plan' },
          { href: '/faq', label: 'FAQ' },
          { href: '/privacy', label: 'Privacy' },
        ],
      },
    ],
  },
  {
    itemLabel: 'Industries',
    submenuItems: [
      { href: 'masking-sms.html', label: 'Property Management' },
      { href: 'non-masking-sms.html', label: 'Real Estate' },
      { href: 'location-based-sms.html', label: 'Retail'},
      { href: '', label:'Automotive'},
      { href: '', label:'Insurance'},
      { href: '', label: 'Fitness'}
    ],
  },
  {
    itemLabel: 'Services',
    submenuItems: [
      { href: 'service.html', label: 'Auto Email to Text Responses' },
      { href: 'reseller.html', label: 'Automations' },
      { href: 'country-coverage.html', label: 'Templates' },
      { href: 'email-service.html', label: 'Contact Management' },

    ],
  },
  /*{
    itemLabel: 'Blog',
    submenuItems: [
      { href: 'blog.html', label: 'Blog grid' },
      { href: 'blog-two.html', label: 'Blog grid sidebar' },
      { href: 'blog-three.html', label: 'Blog classic' },
      { href: 'blog-details.html', label: 'Blog details' },
    ],
  },*/
  {
    itemLabel: 'Account',
    submenuItems: [
      { href: '/login', label: 'Sign In' },
      { href: '/signup', label: 'Sign Up' },
    ],
  },
];

const MENU_ITEMS = MENU_ITEM_DATA.map(({ itemLabel, submenuItems }) => (
  <HeaderMenuItem
    key={itemLabel}
    itemLabel={itemLabel}
    submenuItems={submenuItems}
  />
));

export default function HeaderBottom(): React.Node {
  React.useLayoutEffect(() => {
    // make the header sticky
    var headerOne = $('.header-bottom');
    $(window).on('scroll', function () {
      if ($(this).scrollTop() < 1) {
        headerOne.removeClass('wow fadeInDown header-fixed');
        headerOne.addClass('wow fadeIn');
      } else {
        headerOne.addClass('wow fadeInDown header-fixed');
        headerOne.removeClass('wow fadeIn');
      }
    });
  }, []);

  React.useLayoutEffect(() => {
    //MenuBar
    $('.header-bar').on('click', function () {
      $('.menu').toggleClass('active');
      $('.header-bar').toggleClass('active');
    });

    //MenuBar
    $('.search-bar').on('click', function () {
      $('.search-form-area').addClass('active');
    });
    $('.hide-form').on('click', function () {
      $('.search-form-area').removeClass('active');
    });
    $('.select-bar-bar').on('click', function () {
      $('.select-career').toggleClass('active');
    });

    //Menu Dropdown Icon Adding
    $('ul>li>.submenu').parent('li').addClass('menu-item-has-children');
    // drop down menu width overflow problem fix
    $('ul')
      .parent('li')
      .hover(function () {
        var menu = $(this).find('ul');
        var menupos = $(menu).offset();
        if (menupos.left + menu.width() > $(window).width()) {
          var newpos = -$(menu).width();
          menu.css({
            left: newpos,
          });
        }
      });
    $('.menu li a').on('click', function (e) {
      var element = $(this).parent('li');
      if (element.hasClass('open')) {
        element.removeClass('open');
        element.find('li').removeClass('open');
        element.find('ul').slideUp(300, 'swing');
      } else {
        element.addClass('open');
        element.children('ul').slideDown(300, 'swing');
        element.siblings('li').children('ul').slideUp(300, 'swing');
        element.siblings('li').removeClass('open');
        element.siblings('li').find('li').removeClass('open');
        element.siblings('li').find('ul').slideUp(300, 'swing');
      }
    });
  }, []);

  return (
    <div className="header-bottom">
      <div className="container">
        <div className="header-area">
          <div className="logo">
            <Link to="/">
              <img src={WebsiteImages.smallChatterPyLogo} alt="logo"/>
            </Link>
          </div>
          <ul className="menu">
            {MENU_ITEMS}
            <li>
              <a href="contact.html">contact</a>
            </li>
          </ul>
          <div className="header-bar d-lg-none">
            <span />
            <span />
            <span />
          </div>
          <div className="select-bar-bar">
            <i className="fas fa-ellipsis-v" />
          </div>
          <div className="d-flex select-career justify-content-end">
            <div className="d-md-none">
              <LanguageDropdown />
            </div>
            <a href="#0" className="search-bar">
              <i className="flaticon flaticon-magnifying-glass" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
