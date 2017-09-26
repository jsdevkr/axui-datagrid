import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';


const GridHeader = ({headerTable}) => {
  //const EL_headerTr = headerTable.toJS();
  // const EL_colGroup =


  return (
    <div className={classNames(sass.gridHeader)}>

      <div data-ax5grid-panel="aside-header">

      </div>
      <div data-ax5grid-panel="left-header">

      </div>
      <div data-ax5grid-panel="header">
        <div data-ax5grid-panel-scroll="header">

        </div>
      </div>
      <div data-ax5grid-panel="right-header">

      </div>
    </div>
  )
};

export default GridHeader;