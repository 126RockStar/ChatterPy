// @flow
import * as React from 'react';

type MenuItem =
  | {
      label: string,
      href: string,
    }
  | {
      label: string,
      submenu: $ReadOnlyArray<MenuItem>,
    };

type Props = {
  itemLabel: string,
  submenuItems: $ReadOnlyArray<MenuItem>,
};

export default function HeaderMenuItem({
  itemLabel,
  submenuItems,
}: Props): React.Node {
  function renderSubMenu(menuLabel: string, items: $ReadOnlyArray<MenuItem>) {
    return (
      <>
        <a href="#0">{menuLabel}</a>
        <ul className="submenu">
          {items.map(item => {
            if (item.submenu) {
              return (
                <li key={item.label} className="menu-item-has-children">
                  {renderSubMenu(item.label, item.submenu)}
                </li>
              );
            }
            return (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  return (
    <li className="menu-item-has-children">
      {renderSubMenu(itemLabel, submenuItems)}
    </li>
  );
}
