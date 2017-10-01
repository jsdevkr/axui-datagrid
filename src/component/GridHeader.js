import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';

const GridHeader = ({
                      optionsHeader,
                      asidePanelWidth,
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


  const getHeader = function (_panelName, _colGroup, _bodyRow) {

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
      <div data-panel={_panelName}>
        <table>
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

  return (
    <div className={classNames(sass.gridHeader)}>
      {(asidePanelWidth > 0) ? getHeader("aside-header", asideColGroup, asideHeaderData) : <div data-panel="aside-header" />}
      {(frozenColumnIndex > 0) ? getHeader("left-header", leftHeaderColGroup, leftHeaderData) : <div data-panel="left-header" />}
      <div data-panel="header-scroll-container">
        {getHeader("header-scroll", headerColGroup, headerData)}
      </div>
    </div>
  )
};

export default GridHeader;