import * as React from 'react';
import { IDataGrid } from '../common/@types';

const DataGridTableColGroup: React.SFC<{
  panelColGroup: IDataGrid.ICol[];
}> = ({ panelColGroup }) => (
  <colgroup>
    {panelColGroup.map((col, ci) => (
      <col key={ci} style={{ width: col._width + 'px' }} />
    ))}
    <col />
  </colgroup>
);

export default DataGridTableColGroup;
