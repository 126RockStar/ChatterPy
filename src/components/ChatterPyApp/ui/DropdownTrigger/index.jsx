// @flow
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import $ from 'jquery';
import classNames from 'classnames';
import invariant from 'invariant';
import { useHistory } from 'react-router-dom';
const IS_ACTIVE = 'is-active';

type Props<T> = {
  options: $ReadOnlyArray<
    | { value: T, href: string }
    | { value: T, contents: () => React.MixedElement }
    | T,
  >,
  trigger: React.Node,

  className?: string,
  footer?: React.Node,
  hideCaret?: boolean,
  initialSelectedItem?: T | void,
  inlineExpand?: boolean,
  renderSelectedItem?: (value: T) => React.Node,
  renderOptionContents?: (value: T) => React.Node,
  onSelect?: (value: T) => void,
  triggerClassName?: string,
  usePointer?: boolean,
};

/**
 * A dropdown with a trigger node. It does not persist its selection (use
 * DropdownSelection for that).
 */
export default function DropdownTrigger<T>({
  options,
  trigger,
  className = undefined,
  footer = null,
  hideCaret = false,
  initialSelectedItem = undefined,
  inlineExpand = false,
  renderOptionContents = v => String(v),
  renderSelectedItem = undefined,
  triggerClassName = '',
  onSelect = undefined,
  usePointer = false,
}: Props<T>): React.Element<'div'> {
  const mainDropdownRef = React.useRef();
  const triggerRef = React.useRef();
  const closeRef = React.useRef();
  const [selectedItem, setSelectedItem] = React.useState<T | void>(
    initialSelectedItem,
  );

  const closeDropdown = () => {
    if (mainDropdownRef.current) {
      const $dropdown = $(mainDropdownRef.current);
      $dropdown.removeClass(IS_ACTIVE).find('.dropdown__inner').slideUp();
    }
  };
  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    history.push('/login')
  }
  React.useEffect(() => {
    invariant(mainDropdownRef.current, 'mainDropdownRef should exist by now');
    invariant(triggerRef.current, 'triggerRef should exist by now');
    invariant(closeRef.current, 'closeRef should exist by now');
    const mainDropdownElt = mainDropdownRef.current;
    const triggerElt = triggerRef.current;
    const closeElt = closeRef.current;

    $(triggerElt).on('click', function (e) {
      e.preventDefault();
      const $dropdown = $(mainDropdownElt);

      if (!$dropdown.hasClass(IS_ACTIVE)) {
        // close all the other dropdowns
        $('.js-dropdown')
          .removeClass(IS_ACTIVE)
          .find('.dropdown__inner')
          .slideUp();

        $dropdown.addClass(IS_ACTIVE).find('.dropdown__inner').slideDown();
      } else {
        $dropdown.removeClass(IS_ACTIVE).find('.dropdown__inner').slideUp();
      }
    });

    $(closeElt).on('click', function (e) {
      e.preventDefault();
      closeDropdown();
    });

    $('.js-dropdown-close').on('click', function (e) {
      e.preventDefault();
      let $this = $(this);
      let $dropdown = $this.closest('.dropdown');

      $dropdown.removeClass(IS_ACTIVE).find('.dropdown__inner').slideUp();
    });
  }, []);

  const items = options.map((opt, i) => {
    let value: T;
    let href = '/#';

    if (opt && typeof opt === 'object' && opt.value) {
      value = ((opt.value: $AllowAny): T);
      if (typeof opt.contents === 'function') {
        // $FlowFixMe[incompatible-use]
        return opt.contents();
      }

      if (typeof opt.href === 'string') {
        href = opt.href;
      }
    } else {
      value = ((opt: $AllowAny): T);
    }

    let contents = renderOptionContents(value);
    if (value === selectedItem && renderSelectedItem) {
      contents = renderSelectedItem(value);
    }

    return (
      <li key={typeof value === 'string' ? value : i}>
        <a
          href={href}
          onClick={e => {
            setSelectedItem(value);

            if (onSelect) {
              e.preventDefault();
              onSelect(value);
              closeDropdown();
            }
          }}
        >
          {contents}
        </a>
      </li>
    );
  });

  const mainClassName = classNames('dropdown js-dropdown', className, {
    'dropdown--style-1': !hideCaret,
    'dropdown--style-1-blue': inlineExpand,
    'dropdown--alt': usePointer,
  });

  return (
    <div className={mainClassName} ref={mainDropdownRef}>
      <a
        href="#"
        className={`dropdown__trigger js-dropdown-trigger ${triggerClassName}`}
        ref={triggerRef}
      >
        {trigger}
      </a>

      <div className="dropdown__inner">
        <a
          href="#"
          className="dropdown__close js-dropdown-close"
          ref={closeRef}
        >
          X
        </a>

        <ul className="dropdown__menu">{items}</ul>
        {footer && <a href="#" onClick={handleLogout}>{footer}</a>}
      </div>
    </div>
  );
}
