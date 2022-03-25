import * as React from 'react';

class DataGridHeaderColumnResizer extends React.PureComponent<{
  columnResizing?: boolean;
  columnResizerLeft?: number;
}> {
  render() {
    const { columnResizing = false, columnResizerLeft = 0 } = this.props;

    return columnResizing ? (
      <div data-column-resizer-track>
        <div data-column-resizing style={{ left: columnResizerLeft }} />
      </div>
    ) : null;
  }
}

export default DataGridHeaderColumnResizer;
