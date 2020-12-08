// @flow
import * as React from 'react';

type Props = {
  links: $ReadOnlyArray<{ href: string, label: string }>,
  title: string,
};

export default function FooterLinksBlock({ title, links }: Props): React.Node {
  return (
    <div className="footer-widget footer-link">
      <h5 className="title">{title}</h5>
      <ul>
        {links.map(link => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
