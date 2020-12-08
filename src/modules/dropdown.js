/**
 * Dropdown functions
 */
import $ from 'jquery';



function dropdownFunctions() {
  let isActive = 'is-active';
  let isSelected = 'is-selected';

  /**
   * Normal dropdowns
   */
  function dropdownTriggers() {
    $('.js-dropdown-trigger').on('click', function(e) {
      e.preventDefault();
      let $this = $(this);
      let $dropdown = $this.closest('.js-dropdown');

      if (!$dropdown.hasClass(isActive)) {
        $('.js-dropdown')
          .removeClass(isActive)
          .find('.dropdown__inner')
          .slideUp();

        $dropdown
          .addClass(isActive)
          .find('.dropdown__inner')
          .slideDown();
      } else {
        $dropdown
          .removeClass(isActive)
          .find('.dropdown__inner')
          .slideUp();
      }
    });

    $('.js-dropdown-close').on('click', function(e) {
      e.preventDefault();
      let $this = $(this);
      let $dropdown = $this.closest('.dropdown');

      $dropdown
        .removeClass(isActive)
        .find('.dropdown__inner')
        .slideUp();
    });
  }

  /**
   * Dropdowns with selection
   */

  function dropdownSelectFunctions() {
    $('.js-dropdown-select-trigger').on('click', function(e) {
      console.log('clicked!');
      e.preventDefault();
      let $this = $(this);

      $this
        .parent()
        .toggleClass(isActive)
        .find('.js-dropdown-menu')
        .slideToggle();
    });

    $('.js-dropdown-menu a').on('click', function(e) {
      e.preventDefault();
      let $this = $(this);
      let linkContent = $this.html();
      let $dropdownSelect = $this.closest('.js-dropdown-select');

      if (!$this.parent().hasClass(isSelected)) {
        $this
          .parent()
          .addClass(isSelected)
          .siblings()
          .removeClass(isSelected);

        $dropdownSelect.find('.js-dropdown-select-trigger').html(linkContent);

        $dropdownSelect
          .removeClass(isActive)
          .find('.js-dropdown-menu')
          .slideUp();
      }
    });

    $('.js-dropdown-select').each(function() {
      let linkContent = $(this)
        .find('li.is-selected a')
        .html();
      $(this)
        .find('.js-dropdown-select-trigger')
        .html(linkContent);
    });
  }

  dropdownTriggers();
  dropdownSelectFunctions();
}

export default dropdownFunctions;
