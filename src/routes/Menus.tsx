import * as React from 'react';
import { HomeFilled, SolutionOutlined } from '@ant-design/icons';

export const Menus = {
  start: {
    label: (
      <>
        <HomeFilled />
        Start
      </>
    ),
    menus: [
      { to: '/introduction', label: 'Introduction' },
      { to: '/usage', label: 'Usage' },
    ],
  },
  examples: {
    label: (
      <>
        <SolutionOutlined />
        Examples
      </>
    ),
    menus: [
      { to: '/examples/LargeData', label: 'LargeData' },
      // { to: '/examples/Formatter', label: 'Formatting of data' },
      // { to: '/examples/ChangeColumns', label: 'Change Columns' },
      // { to: '/examples/FrozenColumnRow', label: 'Frozen column and row' },
      // { to: '/examples/MultiColumnHeader', label: 'Multi column header' },
      { to: '/examples/InlineEdit', label: 'Inline edit' },
      // { to: '/examples/EventReceive', label: 'Event' },
      // { to: '/examples/LoadingState', label: 'Loading' },
      { to: '/examples/RowSelector', label: 'RowSelector' },
      // { to: '/examples/FootSum', label: 'Foot summary' },
      { to: '/examples/AlignHeader', label: 'Align Header' },
      // { to: '/examples/Resizing', label: 'Resizing' },
      { to: '/examples/AutofitColumnWidth', label: 'Autofit Column Width' },
      // { to: '/examples/RemoteSort', label: 'Remote Sort' },
      { to: '/examples/MultiEdit', label: 'MultiEdit' },
      { to: '/examples/ResizeColumn', label: 'ResizeColumn' },
      // { to: '/examples/Etc', label: 'etc.' },
      // { to: '/examples/BodyGrouping', label: 'Body grouping' },
    ],
  },
};
