import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';


const GridHeader = ({
                      colGroup,
                      headerTable,
                      asideColGroup,
                      leftHeaderColGroup,
                      headerColGroup,
                      asideHeaderData,
                      leftHeaderData,
                      headerData
                    }) => {

  let asideHeader, leftHeader, header, rightHeader;

  /*
  if (cfg.asidePanelWidth > 0) {
    repaintHeader.call(this, this.$.panel["aside-header"], this.asideColGroup, asideHeaderData);
  }
  if (cfg.frozenColumnIndex > 0) {
    repaintHeader.call(this, this.$.panel["left-header"], this.leftHeaderColGroup, leftHeaderData);
  }

  this.xvar.scrollContentWidth = repaintHeader.call(this, this.$.panel["header-scroll"], this.headerColGroup, headerData);
  */


  return (
    <div className={classNames(sass.gridHeader)}>

      <div data-ax5grid-panel="aside-header">
        {asideHeader}
      </div>
      <div data-ax5grid-panel="left-header">
        {leftHeader}
      </div>
      <div data-ax5grid-panel="header">
        <div data-ax5grid-panel-scroll="header">
          {header}
        </div>
      </div>
      <div data-ax5grid-panel="right-header">
        {rightHeader}
      </div>
    </div>
  )
};

export default GridHeader;