import * as React from 'react';

const DataGridHeaderColumnResizer: React.SFC<{
  columnResizing?: boolean;
  columnResizerLeft?: number;
}> = ({ columnResizing = false, columnResizerLeft = 0 }) =>
  columnResizing ? (
    <div data-column-resizer-track>
      <div data-column-resizing style={{ left: columnResizerLeft }} />
    </div>
  ) : null;

export default DataGridHeaderColumnResizer;
