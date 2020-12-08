/**
 * Jquery ui functions
 */
import $ from 'jquery';

function jqueryUiFunctions() {
  function datepickerJqueryUi() {
    $('.js-datepicker-trigger').datepicker({
      inline: true,
      altField: '.js-datepicker-alt-field',
      altFormat: 'MM dd',
      dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    });

    $('.js-datepicker-alt-field').change(function () {
      $('.js-datepicker-trigger').datepicker('setDate', $(this).val());
    });
  }

  datepickerJqueryUi();
}

export default jqueryUiFunctions;
