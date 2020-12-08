// @flow
import * as React from 'react';

// screen breakpoints following tailwindcss convention
// https://tailwindcss.com/docs/breakpoints
export const SCREEN_SIZE = {
  SMALL: 640,
  PHONE: 640,

  MEDIUM: 768,
  TABLET: 768,

  LARGE: 1024,
  LAPTOP: 1024,

  XL: 1280,
  MONITOR: 1280,
};

// returns tuple of window [width, height]
/**
 * A custom hook that returns the current size of the window
 */
export default function useWindowSize(): [number, number] {
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [windowHeight, setWindowHeight] = React.useState(0);

  React.useLayoutEffect(() => {
    const onWindowResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    // update right away to make sure we have the correct size
    onWindowResize();

    // set up cleanup
    return () => window.removeEventListener('resize', onWindowResize);
  }, []); // only run on-mount

  return [windowWidth, windowHeight];
}
