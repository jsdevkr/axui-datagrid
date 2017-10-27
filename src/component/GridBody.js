import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';
import {Range} from 'immutable';

class GridBody extends React.Component {
  constructor(props) {
    super(props);

  }

  shouldComponentUpdate(nextProps, nextState) {
    let sameProps = false;

    if (
      this.props.mounted !== nextProps.mounted ||
      JSON.stringify(this.props.options) !== JSON.stringify(nextProps.options) ||
      this.props.CTInnerWidth !== nextProps.CTInnerWidth ||
      this.props.CTInnerHeight !== nextProps.CTInnerHeight ||
      JSON.stringify(this.props.colGroup) !== JSON.stringify(nextProps.colGroup) ||
      this.props.list !== nextProps.list ||
      this.props.scrollLeft !== nextProps.scrollLeft ||
      this.props.scrollTop !== nextProps.scrollTop
    ) {
      sameProps = true;
    }

    return sameProps;
  }

  render() {

    const refCallback           = this.props.refCallback,
          mounted               = this.props.mounted,
          options               = this.props.options,
          styles                = this.props.styles,
          frozenColumnIndex     = this.props.frozenColumnIndex,
          colGroup              = this.props.colGroup,
          asideColGroup         = this.props.asideColGroup,
          leftHeaderColGroup    = this.props.leftHeaderColGroup,
          headerColGroup        = this.props.headerColGroup,
          bodyTable             = this.props.bodyTable,
          asideBodyRowData      = this.props.asideBodyRowData,
          asideBodyGroupingData = this.props.asideBodyGroupingData,
          leftBodyRowData       = this.props.leftBodyRowData,
          leftBodyGroupingData  = this.props.leftBodyGroupingData,
          bodyRowData           = this.props.bodyRowData,
          bodyGroupingData      = this.props.bodyGroupingData,
          list                  = this.props.list,
          scrollLeft            = this.props.scrollLeft,
          scrollTop             = this.props.scrollTop,
          CTInnerWidth          = this.props.CTInnerWidth,
          CTInnerHeight         = this.props.CTInnerHeight;

    if (!mounted) return null;

    let scrollPaddingLeft = (headerColGroup[0]) ? headerColGroup[0]._sx : 0;

    const _paintBody = function (_panelName, _style) {
      return (
        <div data-panel={_panelName} style={_style}>
          <table></table>
        </div>
      )
    };

    const paintBody = function (_panelName, _colGroup, _bodyRow, _groupRow, _list, _scrollConfig, _style) {

      const getFieldSpan = function (_colGroup, _col, _item, _itemIdx) {
        let lineHeight = (options.body.columnHeight - options.body.columnPadding * 2 - options.body.columnBorderWidth);
        let colAlign = options.body.align || _col.align;
        let label;

        if(_col.key === "__line_number__"){
          label = _itemIdx + 1;
        }
        else if(_col.key === "__row_selector__"){
          label = <div class="checkBox" style={{maxHeight: (_col.width - 10) + 'px', minHeight:(_col.width - 10) + 'px'}}></div>;
        }
        else{
          label = _item[_col.key];
        }

        return (
          <span
            data-span
            data-align={colAlign}
            style={{
              height: (options.body.columnHeight - options.body.columnBorderWidth) + "px",
              lineHeight: lineHeight + "px"
            }}>
            {label || ' '}
          </span>
        );
      };

      _style.paddingTop = _scrollConfig.sRowIndex * styles.bodyTrHeight;
      if (_scrollConfig.paddingLeft) {
        _style.paddingLeft = _scrollConfig.paddingLeft;
      }

      return (
        <div data-panel={_panelName} style={_style} ref={ref => refCallback(_panelName, ref)}>
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
            {Range(_scrollConfig.sRowIndex, _scrollConfig.eRowIndex).map(
              (li) => {
                const item = _list.get(li);
                if (item) {
                  return (
                    _bodyRow.rows.map(
                      (row, ri) => {
                        return (
                          <tr
                            key={ri}
                            className="">
                            {row.cols.map((col, ci) => {
                              let cellHeight = options.body.columnHeight * col.rowspan - options.body.columnBorderWidth;
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
              }
            )}
            </tbody>
          </table>
        </div>
      )
    };

    let topBodyScrollConfig = {
      sRowIndex: 0,
      eRowIndex: options.frozenRowIndex
    };
    let bodyScrollConfig = {
      sRowIndex: Math.floor(-scrollTop / styles.bodyTrHeight) + options.frozenRowIndex
    };
    bodyScrollConfig.eRowIndex = bodyScrollConfig.sRowIndex + Math.ceil(styles.bodyHeight / styles.bodyTrHeight) + 1;

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

    console.log('render body');
    return (
      <div className={classNames(sass.gridBody)} style={{height: styles.bodyHeight}}>
        {(styles.asidePanelWidth > 0 && styles.frozenRowHeight > 0) ? _paintBody("top-aside-body", topAsideBodyPanelStyle) : null}
        {(styles.frozenPanelWidth > 0 && styles.frozenRowHeight > 0) ? _paintBody("top-left-body", topLeftBodyPanelStyle) : null}
        {(styles.frozenRowHeight > 0) ? (
          <div data-scroll-container="top-body-scroll-container" style={topBodyPanelStyle}>
            {_paintBody("top-body-scroll", topBodyScrollStyle)}
          </div>
        ) : null}

        {(styles.asidePanelWidth > 0) ? (
          <div data-scroll-container="aside-body-scroll-container" style={asideBodyPanelStyle}>
            {paintBody("aside-body-scroll", asideColGroup, asideBodyRowData, asideBodyGroupingData, list, bodyScrollConfig, asideBodyScrollStyle)}
          </div>
        ) : null}

        {(styles.frozenPanelWidth > 0) ? (
          <div data-scroll-container="left-body-scroll-container" style={leftBodyPanelStyle}>
            {paintBody("left-body-scroll", leftHeaderColGroup, leftBodyRowData, leftBodyGroupingData, list, bodyScrollConfig, leftBodyScrollStyle)}
          </div>
        ) : null}

        <div data-scroll-container="body-scroll-container" style={bodyPanelStyle} ref={ref => refCallback("body-scroll-container", ref)}>
          {paintBody("body-scroll", headerColGroup, bodyRowData, bodyGroupingData, list, Object.assign({}, bodyScrollConfig, {paddingLeft: scrollPaddingLeft}), bodyScrollStyle)}
        </div>

        {(styles.asidePanelWidth > 0 && styles.footSumHeight > 0) ? _paintBody("bottom-aside-body", bottomAsideBodyPanelStyle) : null}
        {(styles.frozenPanelWidth > 0 && styles.footSumHeight > 0) ? _paintBody("bottom-left-body", bottomLeftBodyPanelStyle) : null}
        {(styles.footSumHeight > 0) ? (
          <div data-scroll-container="bottom-body-scroll-container" style={bottomBodyPanelStyle}>
            {_paintBody("bottom-body-scroll", bottomBodyScrollStyle)}
          </div>
        ) : null}
      </div>
    );

  }
}

export default GridBody;