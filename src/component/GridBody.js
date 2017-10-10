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
                    leftBodyGroupingData,
                    bodyRowData,
                    bodyGroupingData,
                    list
                  }) => {

  const _paintBody = function (_panelName, _style) {
    return (
      <div data-panel={_panelName} style={_style}>
        <table></table>
      </div>
    )
  };

  const paintBody = function (_panelName, _colGroup, _bodyRow, _groupRow, _list, _scrollConfig, _style) {

    const getFieldSpan = function (_colGroup, _col, _item, _itemIdx) {
      let lineHeight = (optionsBody.columnHeight - optionsBody.columnPadding * 2 - optionsBody.columnBorderWidth);
      let colAlign = optionsBody.align || _col.align;
      let label;

      label = _item[_col.key];

      return (
        <span
          data-span
          data-align={colAlign}
          style={{
            height: (optionsBody.columnHeight - optionsBody.columnBorderWidth) + "px",
            lineHeight: lineHeight + "px"
          }}>
          {label || ' '}
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
          {_list.map(
            (item, li) => {
              return (
                _bodyRow.get('rows').map(
                  (row, ri) => {
                    return (
                      <tr
                        key={ri}
                        className="">
                        {row.cols.map((col, ci) => {
                          let cellHeight = optionsBody.columnHeight * col.rowspan - optionsBody.columnBorderWidth;
                          let classNameItmes = {};
                          classNameItmes[sass.hasBorder] = true;
                          if (row.cols.length == ci + 1) {
                            classNameItmes[sass.isLastColumn] = true;
                          }

                          return (
                            <td
                              key={ci}
                              colSpan={col.colspan}
                              rowSpan={col.rowspan}
                              className={classNames(classNameItmes)}
                              style={{height: cellHeight, minHeight: "1px"}}>
                              {getFieldSpan(colGroup, col, item, li)}
                            </td>
                          );
                        })}
                        <td>&nbsp;</td>
                      </tr>
                    )
                  }
                )
              )
            }
          )}
          </tbody>
        </table>
      </div>
    )
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
          {paintBody("aside-body-scroll", asideColGroup, asideBodyRowData, asideBodyGroupingData, list, scrollConfig, {})}
        </div>
      ) : null}

      {(styles.frozenPanelWidth > 0) ? (
        <div data-panel="left-body-scroll-container" style={leftBodyPanelStyle}>
          {paintBody("left-body-scroll", leftHeaderColGroup, leftBodyRowData, leftBodyGroupingData, list, scrollConfig, {})}
        </div>
      ) : null}

      <div data-panel="body-scroll-container" style={bodyPanelStyle}>
        {paintBody("body-scroll", headerColGroup, bodyRowData, bodyGroupingData, list, scrollConfig, {})}
      </div>

      {(styles.asidePanelWidth > 0 && styles.footSumHeight > 0) ? _paintBody("bottom-aside-body", bottomAsideBodyPanelStyle) : null}
      {(styles.frozenPanelWidth > 0 && styles.footSumHeight > 0) ? _paintBody("bottom-left-body", bottomLeftBodyPanelStyle) : null}
      {(styles.footSumHeight > 0) ? (
        <div data-panel="bottom-body-scroll-container" style={bottomBodyPanelStyle}>
          {_paintBody("bottom-body-scroll", {})}
        </div>
      ) : null}
    </div>
  );
};

export default GridBody;