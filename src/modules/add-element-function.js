/**
 * Add element function
 */

import $ from 'jquery'

function addElement() {
  $('.js-add-item').on('click', function(e) {
    e.preventDefault();
    let $this = $(this);
    let $appendContainer = $this.closest('.js-append-container');

    $appendContainer.each(function() {
      let appendElementCount = $(this).find('.js-append-element').length;

      $(this).find('.js-append-element:first').each(function() {
         $(this)
            .clone()
            .appendTo($appendContainer)
            .find('span')
            .text(appendElementCount + 1)
            .closest('.js-append-element');
      })
    });
  })
}

export default addElement;
