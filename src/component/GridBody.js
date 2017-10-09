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
                    asideBodyGroupingData,
                    leftBodyRowData,
                    bodyRowData,
                    list
                  }) => {

  const _paintBody = function () {
    return (
      <div data-panel={_panelName} style={_style}>
        <table></table>
      </div>
    )
  };

  const paintBody = function (_panelName, _list, _scrollConfig, _style) {
    return (
      <div data-panel={_panelName} style={_style}>
        <table></table>
      </div>
    )
  };

  let scrollConfig = {

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
      {(styles.asidePanelWidth > 0 && styles.frozenRowHeight > 0) ? _paintBody("top-aside-body", topAsideBodyPanelStyle) : null}
      {(styles.frozenPanelWidth > 0 && styles.frozenRowHeight > 0) ? _paintBody("top-left-body", topLeftBodyPanelStyle) : null}
      {(styles.frozenRowHeight > 0) ? (
        <div data-panel="top-body-scroll-container" style={topBodyPanelStyle}>
          {_paintBody("top-body-scroll", {})}
        </div>
      ) : null}

      {(styles.asidePanelWidth > 0) ? (
        <div data-panel="aside-body-scroll-container" style={asideBodyPanelStyle}>
          {paintBody("aside-body-scroll", list, scrollConfig, {})}
        </div>
      ) : null}

      {(styles.frozenPanelWidth > 0) ? (
        <div data-panel="left-body-scroll-container" style={leftBodyPanelStyle}>
          {_paintBody("left-body-scroll", {})}
        </div>
      ) : null}

      <div data-panel="body-scroll-container" style={bodyPanelStyle}>
        {_paintBody("body-scroll", list, scrollConfig, {})}
      </div>

      {(styles.asidePanelWidth > 0 && styles.footSumHeight > 0) ? _paintBody("bottom-aside-body", bottomAsideBodyPanelStyle)  : null}
      {(styles.frozenPanelWidth > 0 && styles.footSumHeight > 0) ? _paintBody("bottom-left-body", bottomLeftBodyPanelStyle)  : null}
      {(styles.footSumHeight > 0) ? (
        <div data-panel="bottom-body-scroll-container" style={bottomBodyPanelStyle}>
          {_paintBody("bottom-body-scroll", {})}
        </div>
      ) : null}
    </div>
  );
};

export default GridBody;