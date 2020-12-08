// @flow
import * as React from 'react';
import $ from 'jquery';

/**
 * Registers the JQuery event handlers for the collapsable accordions
 */
export default function useJQueryAccordion() {
  React.useEffect(() => {
    const $accordion = $('.js-accordion');

    //Hide the inactive sections
    $('.accordion__section').not('.is-current').find('.accordion__body').hide();
    $('.accordion__section')
      .filter('.is-current')
      .find('.js-toggle-content')
      .hide();

    //Handle the show/hide logic
    $accordion.on('click', '.js-accordion-trigger', function (
      event: JQueryEventObject,
    ) {
      event.preventDefault();
      const $accordionSection = $(this).closest('.accordion__section');
      const $accordionBody = $accordionSection.find('.accordion__body');

      $accordionBody.stop().slideToggle();
      $accordionSection.toggleClass('is-current');
      $accordionSection
        .siblings()
        .removeClass('is-current')
        .find('.accordion__body')
        .slideUp();

      // if this accordion section has any toggleable content (like in
      // the BillingInfoBlock), then toggle it
      const $toggleContent = $accordionSection.find('.js-toggle-content');
      if ($toggleContent.is(':visible')) {
        $toggleContent.slideUp();
      } else {
        $toggleContent.slideDown();
      }

      // collapse the other neighboring accordion blocks
      $accordionSection
        .siblings()
        .removeClass('is-current')
        .find('.js-toggle-content')
        .slideDown();
    });
  }, []);
}
