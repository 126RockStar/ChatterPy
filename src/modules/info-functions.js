/**
 * Info functions
 */
import $ from 'jquery'

function infoFunctions() {
  $('.js-info-trigger').on('click', function(e) {
    e.preventDefault();
    let $this = $(this);

    $this
      .closest('.js-chats')
      .toggleClass('is-active')
      // .find('.js-info-content').slideToggle();
  });

  $('.js-info-close').on('click', function(e) {
    e.preventDefault();

    $(this)
      .closest('.js-chats')
      .removeClass('is-active');
  })
}

export default infoFunctions;
