// @flow
import * as React from 'react';

type Props = {
  src: string,
};

export default function SponsorItem({ src }: Props): React.Node {
  return (
    <div className="swiper-slide">
      <div className="sponsor-thumb">
        <img src={src} alt="sponsor" />
      </div>
    </div>
  );
}
