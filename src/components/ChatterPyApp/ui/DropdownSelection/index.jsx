// @flow
import * as React from 'react';
import $ from 'jquery';
import classNames from 'classnames';
import invariant from 'invariant';

type Props<T> = {
  options: $ReadOnlyArray<T>,
  onSelectionChange: (value: T) => void,
  selectedOption: T,

  altStyle?: boolean,
  className?: string,
  label?: string,
  renderOptionDisplayName?: T => string,
};

const IS_ACTIVE = 'is-active';
const IS_SELECTED = 'is-selected';

function defaultDisplayNameRenderer(val: mixed): string {
  if (typeof val === 'string') {
    return val;
  }

  if (typeof val === 'number' || typeof val === 'boolean') {
    return String(val);
  }

  throw new Error('Dropdown value could not be converted to a string');
}

/**
 * A dropdown that persists the selection
 */
export default function DropdownSelection<T>({
  options,
  onSelectionChange,
  selectedOption,
  altStyle = false,
  label = undefined,
  className = '',
  renderOptionDisplayName = defaultDisplayNameRenderer,
}: Props<T>): React.Element<'div'> {
  const mainDivRef = React.useRef();
  const menuRef = React.useRef();
  const selectTriggerRef = React.useRef();

  // attach the jquery click handlers to the dropdown to make it work
  React.useEffect(() => {
    invariant(mainDivRef.current, 'Main ref should have been set after mount.');
    invariant(menuRef.current, 'Menu ref should have been set after mount.');
    invariant(
      selectTriggerRef.current,
      'Select trigger ref should have been set after mount.',
    );
    const mainElt = mainDivRef.current;
    const menuElt = menuRef.current;
    const selectTriggerElt = selectTriggerRef.current;

    $(selectTriggerElt).on('click', function (e) {
      e.preventDefault();
      let $this = $(this);

      $this
        .parent()
        .toggleClass(IS_ACTIVE)
        .find('.js-dropdown-menu')
        .slideToggle();
    });

    // $('.js-dropdown-menu a').on('click', function(e) {
    $(menuElt)
      .find('a')
      .on('click', function (e) {
        e.preventDefault();
        let $this = $(this);
        let linkContent = $this.html();
        let $dropdownSelect = $this.closest('.js-dropdown-select');

        if (!$this.parent().hasClass(IS_SELECTED)) {
          $this
            .parent()
            .addClass(IS_SELECTED)
            .siblings()
            .removeClass(IS_SELECTED);

          $dropdownSelect.find('.js-dropdown-select-trigger').html(linkContent);

          $dropdownSelect
            .removeClass(IS_ACTIVE)
            .find('.js-dropdown-menu')
            .slideUp();
        }
      });

    $(mainElt).each(function () {
      let linkContent = $(this).find('li.is-selected a').html();
      $(this).find('.js-dropdown-select-trigger').html(linkContent);
    });
  }, []);

  const items = options.map(opt => (
    <li
      key={renderOptionDisplayName(opt)}
      className={opt === selectedOption ? IS_SELECTED : ''}
      onClick={() => onSelectionChange(opt)}
    >
      <a href="/#">{renderOptionDisplayName(opt)}</a>
    </li>
  ));

  const divClassName = classNames(
    'dropdown-select js-dropdown-select dropdown-select',
    className,
    { 'dropdown-select--alt': altStyle },
  );

  return (
    <div className={divClassName} ref={mainDivRef}>
      {label !== undefined && <p className="hidden-xs hidden-sm">{label}</p>}
      <a
        href="/#"
        className="dropdown__selected-element js-dropdown-select-trigger"
        ref={selectTriggerRef}
      >
        0
      </a>
      <div className="dropdown__inner js-dropdown-menu" ref={menuRef}>
        <ul className="dropdown__menu">{items}</ul>
      </div>
    </div>
  );
}
