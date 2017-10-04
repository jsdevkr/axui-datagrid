import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';

const GridHeader = ({
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
                      headerData
                    }) => {

  const printHeader = function (_panelName, _colGroup, _bodyRow, _style) {

    const getFieldSpan = function (_colGroup, _col) {
      let lineHeight = (optionsHeader.columnHeight - optionsHeader.columnPadding * 2 - optionsHeader.columnBorderWidth);
      let colAlign = optionsHeader.align || _col.align;
      let label, sorter, filter;

      if (_col.key === "__checkbox_header__") {
        if (optionsHeader.selector) {
          label = <div className="checkBox" style={{"max-height": (_col.width - 10) + "px", "min-height": (_col.width - 10) + "px"}}></div>;
        }
      } else {
        label = _col.label;
      }

      if (_col.key && _col.colIndex !== null && typeof _col.colIndex !== "undefined" && (optionsHeader.sortable === true || _col.sortable === true) && _col.sortable !== false) {
        sorter = <span data-column-sort={_col.colIndex} data-column-sort-order={_colGroup.get(_col.colIndex).sort} />;
      }

      if (_col.colIndex !== null && typeof _col.colIndex !== "undefined" && optionsHeader.enableFilter) {
        filter = <span data-column-filter={_col.colIndex} data-ax5grid-column-filter-value="" />;
      }

      return (
        <span
          data-cell-holder
          data-text-align={colAlign}
          style={{height: (optionsHeader.columnHeight - optionsHeader.columnBorderWidth) + "px", lineHeight: lineHeight + "px"}}>
          {label || ' '}
          {sorter}
          {filter}
        </span>
      );
    };

    return (
      <div data-panel={_panelName} style={_style}>
        <table style={{height: "100%"}}>
          <colgroup>
            {_colGroup.map(
              (col, ci) => (
                <col
                  key={ci}
                  style={{width: col._width + "px"}} />
              )
            )}
            <col />
          </colgroup>
          <tbody>
          {_bodyRow.get('rows').map(
            (row, ri) => {
              return (
                <tr
                  key={ri}
                  className="">
                  {row.cols.map((col, ci) => {
                    let cellHeight = optionsHeader.columnHeight * col.rowspan - optionsHeader.columnBorderWidth;

                    return (
                      <td
                        key={ci}
                        colSpan={col.colspan}
                        rowSpan={col.rowspan}
                        className={classNames(sass.hasBorder)}
                        style={{height: cellHeight, minHeight: "1px"}}>
                        {getFieldSpan(_colGroup, col)}
                      </td>
                    );
                  })}
                  <td>&nbsp;</td>
                </tr>
              );
            }
          )}
          </tbody>
        </table>

        {_colGroup.map(
          (col, ci) => {
            let resizerHeight = optionsHeader.columnHeight * _bodyRow.get('rows').size - optionsHeader.columnBorderWidth;
            let resizer, resizerLeft = 0;
            if (col.colIndex !== null && typeof col.colIndex !== "undefined") {
              resizerLeft += col._width;
              resizer = <div
                key={ci}
                data-column-resizer={col.colIndex} style={{height: resizerHeight + 'px', left: (resizerLeft - 4) + 'px'}} />;
            }
            return (resizer);
          }
        )}

      </div>
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

  return (
    <div className={classNames(sass.gridHeader)}>
      {(styles.asidePanelWidth > 0) ? printHeader("aside-header", asideColGroup, asideHeaderData, asideHeaderPanelStyle) : <div data-panel="aside-header" style={{display: "none"}} />}
      {(frozenColumnIndex > 0) ? printHeader("left-header", leftHeaderColGroup, leftHeaderData, leftHeaderPanelStyle) : <div data-panel="left-header" style={{display: "none"}} />}
      <div data-panel="header-scroll-container" style={headerPanelStyle}>
        {printHeader("header-scroll", headerColGroup, headerData, {height: styles.headerHeight})}
      </div>
    </div>
  )
};

export default GridHeader;