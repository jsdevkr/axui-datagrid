import * as React from 'react';
import { Icon } from 'antd';

export const Menus = {
  start: {
    label: (
      <>
        <Icon type="home" />
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
        <Icon type="solution" />
        Examples
      </>
    ),
    menus: [
      { to: '/examples/LargeData', label: 'LargeData' },
      { to: '/examples/Formatter', label: 'Formatting of data' },
      { to: '/examples/FrozenColumnRow', label: 'Frozen column and row' },
      { to: '/examples/MultiColumnHeader', label: 'Multi column header' },
      { to: '/examples/InlineEdit', label: 'Inline edit' },
      { to: '/examples/EventReceive', label: 'Event' },
      { to: '/examples/LoadingState', label: 'Loading' },
    ],
  },
};
