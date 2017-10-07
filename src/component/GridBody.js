import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';

const GridBody = ({
                    optionsBody,
                    styles,
                    frozenColumnIndex,
                    colGroup,
                    asideColGroup,
                    leftHeaderColGroup,
                    headerColGroup,
                    bodyTable,
                    asideBodyRowData,
                    leftBodyRowData,
                    bodyRowData
                  }) => {


  let topAsideBodyPanelStyle = {};
  let bottomAsideBodyPanelStyle = {};
  let asideBodyPanelStyle = {
    left: 0,
    width: styles.asidePanelWidth,
    height: styles.headerHeight
  };
  let topLeftBodyPanelStyle = {};
  let bottomLeftBodyPanelStyle = {};
  let leftBodyPanelStyle = {
    left: styles.asidePanelWidth,
    width: styles.frozenPanelWidth,
    height: styles.headerHeight
  };
  let topBodyPanelStyle = {};
  let bottomBodyPanelStyle = {};
  let bodyPanelStyle = {
    left: styles.frozenPanelWidth + styles.asidePanelWidth,
    width: styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth,
    height: styles.headerHeight
  };

  return (
    <div className={classNames(sass.gridBody)} style={{}}>
      <div data-panel="top-aside-body" style={topAsideBodyPanelStyle}>

      </div>
      <div data-panel="top-left-body" style={topLeftBodyPanelStyle}>

      </div>
      <div data-panel="top-body-scroll-container" style={topBodyPanelStyle}>
        <div data-panel="top-body-scroll">

        </div>
      </div>

      <div data-panel="aside-body-scroll-container" style={asideBodyPanelStyle}>
        <div data-panel="aside-body-scroll">

        </div>
      </div>
      <div data-panel="left-body-scroll-container" style={leftBodyPanelStyle}>
        <div data-panel="left-body-scroll">

        </div>
      </div>
      <div data-panel="body-scroll-container" style={bodyPanelStyle}>
        <div data-panel="body-scroll">

        </div>
      </div>

      <div data-panel="bottom-aside-body" style={bottomAsideBodyPanelStyle}>

      </div>
      <div data-panel="bottom-left-body" style={bottomLeftBodyPanelStyle}>

      </div>
      <div data-panel="bottom-body-scroll-container" style={bottomBodyPanelStyle}>
        <div data-panel="bottom-body-scroll">

        </div>
      </div>
    </div>
  );
};

export default GridBody;