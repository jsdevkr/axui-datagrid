import * as React from 'react';
import { types } from '../stores';

const DataGridTableColGroup: React.SFC<{
  panelColGroup: types.DataGridCol[];
}> = ({ panelColGroup }) => (
  <colgroup>
    {panelColGroup.map((col, ci) => (
      <col key={ci} style={{ width: col._width + 'px' }} />
    ))}
    <col />
  </colgroup>
);

export default DataGridTableColGroup;
