import * as React from 'react';
import $ from 'jquery';

/**
 * Sets up JQuery event handlers for message composer
 */
export default function useMessageComposer(): void {
  React.useEffect(() => {
    ($('.js-datepicker-trigger'): any).datepicker({
      inline: true,
      altField: '.js-datepicker-alt-field',
      altFormat: 'MM dd',
      dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    });

    $('.js-datepicker-alt-field').change(function () {
      ($('.js-datepicker-trigger'): any).datepicker('setDate', $(this).val());
    });
  }, []);
}
