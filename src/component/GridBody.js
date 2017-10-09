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

  const printBody = function (_panelName, _style) {
    return (
      <div data-panel={_panelName} style={_style}>
        <table></table>
      </div>
    )
  };

  let topAsideBodyPanelStyle = {
    left: 0,
    width: styles.asidePanelWidth,
    top: 0,
    height: styles.frozenRowHeight
  };
  let bottomAsideBodyPanelStyle = {
    left: 0,
    width: styles.asidePanelWidth,
    top: styles.bodyHeight - styles.footSumHeight,
    height: styles.footSumHeight
  };
  let asideBodyPanelStyle = {
    left: 0,
    width: styles.asidePanelWidth,
    top: styles.frozenRowHeight,
    height: styles.bodyHeight - styles.frozenRowHeight - styles.footSumHeight
  };

  let topLeftBodyPanelStyle = {
    left: styles.asidePanelWidth,
    width: styles.frozenPanelWidth,
    top: 0,
    height: styles.frozenRowHeight
  };
  let bottomLeftBodyPanelStyle = {
    left: styles.asidePanelWidth,
    width: styles.frozenPanelWidth,
    top: styles.bodyHeight - styles.footSumHeight,
    height: styles.footSumHeight
  };
  let leftBodyPanelStyle = {
    left: styles.asidePanelWidth,
    width: styles.frozenPanelWidth,
    top: styles.frozenRowHeight,
    height: styles.bodyHeight - styles.frozenRowHeight - styles.footSumHeight
  };

  let topBodyPanelStyle = {
    left: styles.frozenPanelWidth + styles.asidePanelWidth,
    width: styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth,
    top: 0,
    height: styles.frozenRowHeight
  };
  let bottomBodyPanelStyle = {
    left: styles.frozenPanelWidth + styles.asidePanelWidth,
    width: styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth,
    top: styles.bodyHeight - styles.footSumHeight,
    height: styles.footSumHeight
  };
  let bodyPanelStyle = {
    left: styles.frozenPanelWidth + styles.asidePanelWidth,
    width: styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth,
    top: styles.frozenRowHeight,
    height: styles.bodyHeight - styles.frozenRowHeight - styles.footSumHeight
  };

  return (
    <div className={classNames(sass.gridBody)} style={{height: styles.bodyHeight}}>
      {(styles.asidePanelWidth > 0 && styles.frozenRowHeight > 0) ? printBody("top-aside-body", topAsideBodyPanelStyle) : <div data-panel="top-aside-body" style={{display: "none"}} />}
      {(styles.frozenPanelWidth > 0 && styles.frozenRowHeight > 0) ? printBody("top-left-body", topLeftBodyPanelStyle) : <div data-panel="top-left-body" style={{display: "none"}} />}
      {(styles.frozenRowHeight > 0) ? (
        <div data-panel="top-body-scroll-container" style={topBodyPanelStyle}>
          {printBody("top-body-scroll", {height: topBodyPanelStyle.height})}
        </div>
      ) : <div data-panel="top-body-scroll-container" style={{display:"none"}} />}

      {(styles.asidePanelWidth > 0) ? (
        <div data-panel="aside-body-scroll-container" style={asideBodyPanelStyle}>
          {printBody("aside-body-scroll", {height: asideBodyPanelStyle.height})}
        </div>
      ) : <div data-panel="aside-body-scroll-container" style={{display:"none"}} />}

      {(styles.frozenPanelWidth > 0) ? (
        <div data-panel="left-body-scroll-container" style={leftBodyPanelStyle}>
          {printBody("left-body-scroll", {height: leftBodyPanelStyle.height})}
        </div>
      ) : <div data-panel="left-body-scroll-container" style={{display:"none"}} />}

      <div data-panel="body-scroll-container" style={bodyPanelStyle}>
        {printBody("body-scroll", {height: bodyPanelStyle.height})}
      </div>

      {(styles.asidePanelWidth > 0 && styles.footSumHeight > 0) ? printBody("bottom-aside-body", bottomAsideBodyPanelStyle)  : <div data-panel="bottom-aside-body" style={{display:"none"}} />}
      {(styles.frozenPanelWidth > 0 && styles.footSumHeight > 0) ? printBody("bottom-left-body", bottomLeftBodyPanelStyle)  : <div data-panel="bottom-left-body" style={{display:"none"}} />}
      {(styles.footSumHeight > 0) ? (
        <div data-panel="bottom-body-scroll-container" style={bottomBodyPanelStyle}>
          {printBody("bottom-body-scroll", {height: bottomBodyPanelStyle.height})}
        </div>
      ) : <div data-panel="bottom-body-scroll-container" style={{display:"none"}} />}
    </div>
  );
};

export default GridBody;