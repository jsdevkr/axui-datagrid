import * as React from 'react';

interface IProps {
  columnResizing: boolean;
  columnResizerLeft: number;
}

const DataGridHeaderColumnResizer: React.SFC<IProps> = ({
  columnResizing,
  columnResizerLeft,
}) =>
  columnResizing ? (
    <div data-column-resizing style={{ left: columnResizerLeft }} />
  ) : null;

export default DataGridHeaderColumnResizer;
