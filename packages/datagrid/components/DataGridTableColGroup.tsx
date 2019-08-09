import * as React from 'react';
import { IDataGrid } from '../common/@types';

class DataGridTableColGroup extends React.PureComponent<{
  panelColGroup: IDataGrid.ICol[];
}> {
  render() {
    return (
      <colgroup>
        {this.props.panelColGroup.map((col, ci) => (
          <col key={ci} style={{ width: col._width + 'px' }} />
        ))}
        <col />
      </colgroup>
    );
  }
}

export default DataGridTableColGroup;
