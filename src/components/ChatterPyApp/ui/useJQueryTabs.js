// @flow
import * as React from 'react';
import $ from 'jquery';

/**
 * Sets up the event handlers for jQuey tabs
 */
export default function useJQueryTabs() {
  // enable the jquery tab functionality
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
  }, []);
}
