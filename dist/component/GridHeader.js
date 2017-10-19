import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';

const GridHeader = ({
  refCallback,
  mounted,
  optionsHeader,
  styles,
  frozenColumnIndex,
  colGroup,
  headerTable,
  asideColGroup,
  leftHeaderColGroup,
  headerColGroup,
  asideHeaderData,
  leftHeaderData,
  headerData,
  scrollLeft
}) => {

  if (!mounted) return null;

  const printHeader = function (_panelName, _colGroup, _bodyRow, _style) {

    const getFieldSpan = function (_colGroup, _col) {
      let lineHeight = optionsHeader.columnHeight - optionsHeader.columnPadding * 2 - optionsHeader.columnBorderWidth;
      let colAlign = optionsHeader.align || _col.align;
      let label, sorter, filter;

      if (_col.key === "__checkbox_header__") {
        if (optionsHeader.selector) {
          label = React.createElement('div', { 'data-checkbox': true, style: {
              maxHeight: _col.width - 10 + "px",
              minHeight: _col.width - 10 + "px"
            } });
        }
      } else {
        label = _col.label;
      }

      if (_col.key && _col.colIndex !== null && typeof _col.colIndex !== "undefined" && (optionsHeader.sortable === true || _col.sortable === true) && _col.sortable !== false) {
        sorter = React.createElement('span', { 'data-sorter': _col.colIndex, 'data-sorter-order': _colGroup.get(_col.colIndex).sort });
      }

      if (_col.colIndex !== null && typeof _col.colIndex !== "undefined" && optionsHeader.enableFilter) {
        filter = React.createElement('span', { 'data-filter': _col.colIndex, 'data-filter-value': '' });
      }

      return React.createElement(
        'span',
        {
          'data-span': true,
          'data-align': colAlign,
          style: {
            height: optionsHeader.columnHeight - optionsHeader.columnBorderWidth + "px",
            lineHeight: lineHeight + "px"
          } },
        sorter,
        label || ' ',
        filter
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
          _bodyRow.get('rows').map((row, ri) => {
            return React.createElement(
              'tr',
              {
                key: ri,
                className: '' },
              row.cols.map((col, ci) => {
                let cellHeight = optionsHeader.columnHeight * col.rowspan - optionsHeader.columnBorderWidth;
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
                  getFieldSpan(colGroup, col)
                );
              }),
              React.createElement(
                'td',
                null,
                '\xA0'
              )
            );
          })
        )
      ),
      _colGroup.map((col, ci) => {
        let resizerHeight = optionsHeader.columnHeight * _bodyRow.get('rows').size - optionsHeader.columnBorderWidth;
        let resizer,
            resizerLeft = 0;
        if (col.colIndex !== null && typeof col.colIndex !== "undefined") {
          resizerLeft += col._width;
          resizer = React.createElement('div', {
            key: ci,
            'data-column-resizer': col.colIndex, style: { height: resizerHeight + 'px', left: resizerLeft - 4 + 'px' } });
        }
        return resizer;
      })
    );
  };

  let asideHeaderPanelStyle = {
    left: 0,
    width: styles.asidePanelWidth,
    height: styles.headerHeight
  };
  let leftHeaderPanelStyle = {
    left: styles.asidePanelWidth,
    width: styles.frozenPanelWidth,
    height: styles.headerHeight
  };
  let headerPanelStyle = {
    left: styles.frozenPanelWidth + styles.asidePanelWidth,
    width: styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth,
    height: styles.headerHeight
  };

  let headerScrollStyle = {
    height: styles.headerHeight,
    left: scrollLeft
  };

  return React.createElement(
    'div',
    { className: classNames(sass.gridHeader), style: { height: styles.headerHeight } },
    styles.asidePanelWidth > 0 ? printHeader("aside-header", asideColGroup, asideHeaderData, asideHeaderPanelStyle) : null,
    frozenColumnIndex > 0 ? printHeader("left-header", leftHeaderColGroup, leftHeaderData, leftHeaderPanelStyle) : null,
    React.createElement(
      'div',
      { 'data-scroll-container': 'header-scroll-container', style: headerPanelStyle },
      printHeader("header-scroll", headerColGroup, headerData, headerScrollStyle)
    )
  );
};

export default GridHeader;