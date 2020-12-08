/**
 * Tabs functions
 */
import $ from 'jquery';

function tabsFunctions() {
  //Trigger Tabs action

  $('.js-tabs .tabs__nav a').on('click', function(event) {
    event.preventDefault();
    let currentClass = 'is-current';
    let $tabLink = $(this);
    let $targetTab = $($tabLink.attr('href'));

    $('.tab.is-current').addClass('translating');

    setTimeout(function() {
      $('.tab.is-current').removeClass('translating');

      $tabLink
        .parent()
        .add($targetTab)
          .addClass(currentClass)
          .siblings()
            .removeClass(currentClass).removeClass('translating-in');

      setTimeout(function() {
        $('.tab.is-current').addClass('translating-in');
      }, 10);
    }, 500);
  });
}

export default tabsFunctions;
