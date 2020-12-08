/**
 * Popup functions
 */
import $ from 'jquery';

function popupFunctions() {
  $('.js-popup-trigger').on('click', function(e) {
    let $this = $(this);
    e.preventDefault();

    $('.js-popup.is-active').removeClass('is-active');

    $this
      .closest('.js-popup')
      .addClass('is-active');
  })

  $('.js-popup-close').on('click', function(e) {
    let $this = $(this);
    e.preventDefault();

    $this
      .closest('.js-popup')
      .removeClass('is-active');
  })
}

export default popupFunctions;
