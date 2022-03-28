import React, { useEffect, useRef, useState } from 'react';
import { throttle } from '../datagrid/utils';

interface IDataGridSize {
  width: number;
  height: number;
}

export function useDataGridSize() {
  const dataGridContainerRef = useRef<HTMLDivElement>(null);
  const [dataGridSize, setDataGridSize] = useState<IDataGridSize>({
    width: 600,
    height: 400,
  });

  useEffect(() => {
    const throttledResize = throttle(() => {
      if (dataGridContainerRef.current) {
        setDataGridSize({
          width: dataGridContainerRef.current.clientWidth,
          height: dataGridContainerRef.current.clientHeight,
        });
      }
    }, 100);

    // Add event listener
    window.addEventListener('resize', throttledResize);
    // Call handler right away so state gets updated with initial window size
    throttledResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', throttledResize);
  }, []); // Empty array ensures that effect is only run on mount

  return {
    dataGridContainerRef,
    width: dataGridSize.width,
    height: dataGridSize.height,
  };
}
