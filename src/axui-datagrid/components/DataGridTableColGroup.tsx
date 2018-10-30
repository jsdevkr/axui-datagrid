import * as React from 'react';
import { IDataGridCol } from '../common/@types';

const DataGridTableColGroup: React.SFC<{
  panelColGroup: IDataGridCol[];
}> = ({ panelColGroup }) => (
  <colgroup>
    {panelColGroup.map((col, ci) => (
      <col key={ci} style={{ width: col._width + 'px' }} />
    ))}
    <col />
  </colgroup>
);

export default DataGridTableColGroup;
