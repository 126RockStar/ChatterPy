/**
 * Nav trigger js
 */

import $ from 'jquery';

function navTriggerFunctions() {
  function navTopToggle() {
    $('.js-nav-trigger').on('click', function(e) {
      e.preventDefault();
      let $this = $(this);

      $this.toggleClass('is-active').next().slideToggle();
    })
  }

  function navLeftToggle() {
    $('.js-nav-trigger-left').on('click', function(e) {
      e.preventDefault();
      let $this = $(this);

      $this.toggleClass('is-active')
        .next()
        .toggleClass('is-active')
        .closest('.section')
        .find('.section__content')
        .toggleClass('is-active')
        .closest('body')
        .toggleClass('is-active');
    })
  }

  navTopToggle();
  navLeftToggle();
}

export default navTriggerFunctions;
