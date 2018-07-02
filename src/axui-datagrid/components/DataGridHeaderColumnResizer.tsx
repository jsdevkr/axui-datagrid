import * as React from 'react';

interface IProps {
  columnResizing?: boolean;
  columnResizerLeft?: number;
}

const DataGridHeaderColumnResizer: React.SFC<IProps> = ({
  columnResizing = false,
  columnResizerLeft = 0,
}) =>
  columnResizing ? (
    <div data-column-resizer-track>
      <div data-column-resizing style={{ left: columnResizerLeft }} />
    </div>
  ) : null;

export default DataGridHeaderColumnResizer;
