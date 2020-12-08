// @flow
import * as React from 'react';

type Props = {
  text: string,
};

export default function HeroArea({ text }: Props): React.Node {
  return (
    <section className="hero-area bg_img">
      <div className="container">
        <h1 className="title m-0">{text}</h1>
      </div>
    </section>
  );
}
