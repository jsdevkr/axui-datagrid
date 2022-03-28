import React, { useEffect, useState } from 'react';
import { throttle } from '../datagrid/utils';

interface IWindowSize {
  width?: number;
  height?: number;
}

export function useWindowSize(): IWindowSize {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const throttledResize = throttle(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 100);

    // Add event listener
    window.addEventListener('resize', throttledResize);
    // Call handler right away so state gets updated with initial window size
    throttledResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', throttledResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}
