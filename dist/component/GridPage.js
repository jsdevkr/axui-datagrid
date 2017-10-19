import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';

const GridPage = ({
  mounted,
  styles
}) => {

  if (!mounted) return null;

  return React.createElement('div', { className: classNames(sass.gridPage), style: { height: styles.pageHeight } });
};

export default GridPage;