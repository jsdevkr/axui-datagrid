import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';

const GridBody = ({
  refCallback,
  mounted,
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
  leftBodyGroupingData,
  bodyRowData,
  bodyGroupingData,
  list,
  scrollLeft,
  scrollTop
}) => {

  if (!mounted) return null;

  const _paintBody = function (_panelName, _style) {
    return React.createElement(
      'div',
      { 'data-panel': _panelName, style: _style },
      React.createElement('table', null)
    );
  };

  const paintBody = function (_panelName, _colGroup, _bodyRow, _groupRow, _list, _scrollConfig, _style) {

    const getFieldSpan = function (_colGroup, _col, _item, _itemIdx) {
      let lineHeight = optionsBody.columnHeight - optionsBody.columnPadding * 2 - optionsBody.columnBorderWidth;
      let colAlign = optionsBody.align || _col.align;
      let label;

      label = _item[_col.key];

      return React.createElement(
        'span',
        {
          'data-span': true,
          'data-align': colAlign,
          style: {
            height: optionsBody.columnHeight - optionsBody.columnBorderWidth + "px",
            lineHeight: lineHeight + "px"
          } },
        label || ' '
      );
    };

    return React.createElement(
      'div',
      { 'data-panel': _panelName, style: _style, ref: ref => refCallback(_panelName, ref) },
      React.createElement(
        'table',
        { style: { height: "100%" } },
        React.createElement(
          'colgroup',
          null,
          _colGroup.map((col, ci) => React.createElement('col', {
            key: ci,
            style: { width: col._width + "px" } })),
          React.createElement('col', null)
        ),
        React.createElement(
          'tbody',
          null,
          _list.map((item, li) => {
            return _bodyRow.get('rows').map((row, ri) => {
              return React.createElement(
                'tr',
                {
                  key: ri,
                  className: '' },
                row.cols.map((col, ci) => {
                  let cellHeight = optionsBody.columnHeight * col.rowspan - optionsBody.columnBorderWidth;
                  let classNameItmes = {};
                  classNameItmes[sass.hasBorder] = true;
                  if (row.cols.length == ci + 1) {
                    classNameItmes[sass.isLastColumn] = true;
                  }

                  return React.createElement(
                    'td',
                    {
                      key: ci,
                      colSpan: col.colspan,
                      rowSpan: col.rowspan,
                      className: classNames(classNameItmes),
                      style: { height: cellHeight, minHeight: "1px" } },
                    getFieldSpan(colGroup, col, item, li)
                  );
                }),
                React.createElement(
                  'td',
                  null,
                  '\xA0'
                )
              );
            });
          })
        )
      )
    );
  };

  let scrollConfig = {};

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

  let topBodyScrollStyle = {
    left: scrollLeft
  };
  let asideBodyScrollStyle = {
    top: scrollTop
  };
  let leftBodyScrollStyle = {
    top: scrollTop
  };
  let bodyScrollStyle = {
    left: scrollLeft,
    top: scrollTop
  };
  let bottomBodyScrollStyle = {
    left: scrollLeft
  };

  return React.createElement(
    'div',
    { className: classNames(sass.gridBody), style: { height: styles.bodyHeight } },
    styles.asidePanelWidth > 0 && styles.frozenRowHeight > 0 ? _paintBody("top-aside-body", topAsideBodyPanelStyle) : null,
    styles.frozenPanelWidth > 0 && styles.frozenRowHeight > 0 ? _paintBody("top-left-body", topLeftBodyPanelStyle) : null,
    styles.frozenRowHeight > 0 ? React.createElement(
      'div',
      { 'data-scroll-container': 'top-body-scroll-container', style: topBodyPanelStyle },
      _paintBody("top-body-scroll", topBodyScrollStyle)
    ) : null,
    styles.asidePanelWidth > 0 ? React.createElement(
      'div',
      { 'data-scroll-container': 'aside-body-scroll-container', style: asideBodyPanelStyle },
      paintBody("aside-body-scroll", asideColGroup, asideBodyRowData, asideBodyGroupingData, list, scrollConfig, asideBodyScrollStyle)
    ) : null,
    styles.frozenPanelWidth > 0 ? React.createElement(
      'div',
      { 'data-scroll-container': 'left-body-scroll-container', style: leftBodyPanelStyle },
      paintBody("left-body-scroll", leftHeaderColGroup, leftBodyRowData, leftBodyGroupingData, list, scrollConfig, leftBodyScrollStyle)
    ) : null,
    React.createElement(
      'div',
      { 'data-scroll-container': 'body-scroll-container', style: bodyPanelStyle, ref: ref => refCallback("body-scroll-container", ref) },
      paintBody("body-scroll", headerColGroup, bodyRowData, bodyGroupingData, list, scrollConfig, bodyScrollStyle)
    ),
    styles.asidePanelWidth > 0 && styles.footSumHeight > 0 ? _paintBody("bottom-aside-body", bottomAsideBodyPanelStyle) : null,
    styles.frozenPanelWidth > 0 && styles.footSumHeight > 0 ? _paintBody("bottom-left-body", bottomLeftBodyPanelStyle) : null,
    styles.footSumHeight > 0 ? React.createElement(
      'div',
      { 'data-scroll-container': 'bottom-body-scroll-container', style: bottomBodyPanelStyle },
      _paintBody("bottom-body-scroll", bottomBodyScrollStyle)
    ) : null
  );
};

export default GridBody;