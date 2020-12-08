// @flow
import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import '../../../assets/scss/style.scss';

const links = [
  { to: '/#', label: 'Organization' },
  { to: '/#', label: 'Departments' },
  { to: '/#', label: 'Integrations' },
  { to: '/app/admin/user-list-view', label: 'Users' },
  { to: '/#', label: 'Security' },
  { to: '/app/admin/plans-and-pricing', label: 'Plans & Billings' },
  { to: '/#', label: 'Feedback' },
];

export default function AdminSidebar(): React.Node {
  const location = useLocation();
  return (
    <aside className="section__aside">
      <nav className="nav-secondary-alt">
        <a href="/#" className="nav-close js-nav-close">
          x
        </a>

        <ul>
          {links.map(link => (
            <li
              key={link.label}
              className={
                link.to === location.pathname ? 'is-current' : undefined
              }
            >
              <NavLink to={link.to}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
