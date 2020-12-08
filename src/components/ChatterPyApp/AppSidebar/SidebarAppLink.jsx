// @flow
import * as React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  imgHeight: number,
  imgSrc: string,
  imgWidth: number,
  label: string,
  to: string,
};

export default function SidebarAppLink({
  imgHeight,
  imgSrc,
  imgWidth,
  label,
  to,
}: Props): React.Node {
  return (
    <li>
      <NavLink to={to}>
        <span>
          <img src={imgSrc} alt="" width={imgWidth} height={imgHeight} />
        </span>
        {label}
      </NavLink>
    </li>
  );
}
