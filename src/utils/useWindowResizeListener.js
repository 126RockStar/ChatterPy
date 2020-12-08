// @flow
import * as React from 'react';

/**
 * A custom hook that attaches a `callback` to a window resize event listener.
 */
export default function useWindowResizeListener(callback: () => void): void {
  React.useEffect(() => {
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  }, [callback]);
}
