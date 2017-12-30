"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var immutable_1 = require("immutable");
var classnames_1 = require("classnames");
var isFunction_1 = require("lodash-es/isFunction");
var isString_1 = require("lodash-es/isString");
var constant_1 = require("../_inc/constant");
var GridBody = /** @class */ (function (_super) {
    __extends(GridBody, _super);
    function GridBody(props) {
        var _this = _super.call(this, props) || this;
        _this.onEditInput = _this.onEditInput.bind(_this);
        return _this;
    }
    GridBody.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var sameProps = false;
        if (this.props.mounted !== nextProps.mounted ||
            this.props.options !== nextProps.options ||
            this.props.CTInnerWidth !== nextProps.CTInnerWidth ||
            this.props.CTInnerHeight !== nextProps.CTInnerHeight ||
            this.props.colGroup !== nextProps.colGroup ||
            this.props.list !== nextProps.list ||
            this.props.scrollLeft !== nextProps.scrollLeft ||
            this.props.scrollTop !== nextProps.scrollTop ||
            this.props.selectionRows !== nextProps.selectionRows ||
            this.props.selectionCols !== nextProps.selectionCols ||
            this.props.focusedRow !== nextProps.focusedRow ||
            this.props.focusedCol !== nextProps.focusedCol ||
            this.props.isInlineEditing !== nextProps.isInlineEditing ||
            this.props.inlineEditingCell !== nextProps.inlineEditingCell) {
            sameProps = true;
        }
        return sameProps;
    };
    GridBody.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props.inlineEditingCell !== prevProps.inlineEditingCell) {
            if (this.editInput) {
                this.editInput.select();
            }
        }
    };
    GridBody.prototype.paintBodyTemp = function (_panelName, _style) {
        return (<div data-panel={_panelName} style={_style}>
        <table />
      </div>);
    };
    GridBody.prototype.paintBody = function (_panelName, _colGroup, _bodyRow, _groupRow, _list, _scrollConfig, _style) {
        var _this = this;
        var _a = this.props, styles = _a.styles, options = _a.options, colGroup = _a.colGroup, selectionRows = _a.selectionRows, selectionCols = _a.selectionCols, focusedRow = _a.focusedRow, focusedCol = _a.focusedCol, columnFormatter = _a.columnFormatter, onDoubleClickCell = _a.onDoubleClickCell, isInlineEditing = _a.isInlineEditing, inlineEditingCell = _a.inlineEditingCell;
        var getLabel = function (_colGroup, _col, _item, _itemIdx) {
            var formatterData = {
                list: _list,
                item: _item,
                index: _itemIdx,
                key: _col.key,
                value: _item[_col.key],
                options: options
            };
            var label;
            if (isString_1["default"](_col.formatter) && _col.formatter in columnFormatter) {
                label = columnFormatter[_col.formatter](formatterData);
            }
            else if (isFunction_1["default"](_col.formatter)) {
                label = _col.formatter(formatterData);
            }
            else {
                label = _item[_col.key];
            }
            return label;
        };
        var getFieldSpan = function (_colGroup, _col, _item, _itemIdx) {
            var lineHeight = (options.body.columnHeight - options.body.columnPadding * 2 - options.body.columnBorderWidth);
            var colAlign = options.body.align || _col.align;
            var label;
            if (_col.key === '__line_number__') {
                label = _itemIdx + 1;
            }
            else if (_col.key === '__row_selector__') {
                label = <div className={classnames_1["default"]('axd-check-box')} style={{ maxHeight: (_col.width - 10) + 'px', minHeight: (_col.width - 10) + 'px' }}/>;
            }
            else {
                label = getLabel(_colGroup, _col, _item, _itemIdx);
            }
            var spanStyle = {
                height: (options.body.columnHeight - options.body.columnBorderWidth) + 'px',
                lineHeight: lineHeight + 'px',
                textAlign: colAlign
            };
            return (<span data-span={_col.columnAttr || ''} data-pos={_col.colIndex + ',' + _col.rowIndex + ',' + _itemIdx} style={spanStyle}>
          {label || ' '}
        </span>);
        };
        _style.paddingTop = _scrollConfig.sRowIndex * styles.bodyTrHeight;
        if (_scrollConfig.paddingLeft) {
            _style.paddingLeft = _scrollConfig.paddingLeft;
        }
        return (<div data-panel={_panelName} style={_style}>
        <table style={{ height: '100%' }}>
          <colgroup>
            {_colGroup.map(function (col, ci) { return (<col key={ci} style={{ width: col._width + 'px' }}/>); })}
            <col />
          </colgroup>
          <tbody>
          {immutable_1.Range(_scrollConfig.sRowIndex, _scrollConfig.eRowIndex).map(function (li) {
            var item = _list.get(li);
            if (item) {
                return (_bodyRow.rows.map(function (row, ri) {
                    return (<tr key={ri}>
                          {row.cols.map(function (col, ci) {
                        var cellHeight = options.body.columnHeight * col.rowspan - options.body.columnBorderWidth;
                        var classNameItems = (_a = {},
                            _a['axd-line-number'] = (col.columnAttr === 'lineNumber'),
                            _a['axd-row-selector'] = (col.columnAttr === 'rowSelector'),
                            _a);
                        var td = null;
                        if (col.columnAttr === 'lineNumber') {
                            if (focusedRow === li) {
                                classNameItems['focused'] = true;
                            }
                            if (selectionRows[li]) {
                                classNameItems['selected'] = true;
                            }
                        }
                        else if (col.columnAttr === 'rowSelector') {
                        }
                        else {
                            if (selectionRows[li] && selectionCols[col.colIndex]) {
                                classNameItems['selected'] = true;
                            }
                            if (focusedRow === li && focusedCol == col.colIndex) {
                                classNameItems['focused'] = true;
                            }
                        }
                        if (isInlineEditing && inlineEditingCell.row === li && inlineEditingCell.col === col.colIndex) {
                            td = <td key={ci} colSpan={col.colspan} rowSpan={col.rowspan} className={classnames_1["default"](classNameItems)} style={{ height: cellHeight, minHeight: '1px' }}>
                                <input type='text' ref={function (input) {
                                _this.editInput = input;
                            }} onBlur={function (e) {
                                _this.onEditInput(constant_1.E_NAME.BLUR, e);
                            }} onKeyDown={function (e) {
                                _this.onEditInput(constant_1.E_NAME.KEY_DOWN, e);
                            }} data-inline-edit defaultValue={item[col.key]}/>
                              </td>;
                        }
                        else {
                            td = <td key={ci} colSpan={col.colspan} rowSpan={col.rowspan} className={classnames_1["default"](classNameItems)} style={{ height: cellHeight, minHeight: '1px' }} onDoubleClick={function (e) {
                                onDoubleClickCell(e, col, li);
                            }}>
                                {getFieldSpan(colGroup, col, item, li)}
                              </td>;
                        }
                        return td;
                        var _a;
                    })}
                          <td data-pos={'E,0,' + li}>&nbsp;</td>
                        </tr>);
                }));
            }
        })}
          </tbody>
        </table>
      </div>);
    };
    GridBody.prototype.onEditInput = function (E_TYPE, e) {
        var _a = this.props, updateEditInput = _a.updateEditInput, inlineEditingCell = _a.inlineEditingCell;
        var proc = (_b = {},
            _b[constant_1.E_NAME.BLUR] = function () {
                updateEditInput('cancel');
            },
            _b[constant_1.E_NAME.KEY_DOWN] = function () {
                if (e.which === constant_1.KEY_CODE.ESC) {
                    updateEditInput('cancel');
                }
                else if (e.which === constant_1.KEY_CODE.RETURN) {
                    updateEditInput('update', inlineEditingCell.row, inlineEditingCell.col, e.target.value);
                }
            },
            _b);
        proc[E_TYPE]();
        var _b;
    };
    GridBody.prototype.render = function () {
        var _a = this.props, mounted = _a.mounted, styles = _a.styles, options = _a.options, frozenColumnIndex = _a.frozenColumnIndex, colGroup = _a.colGroup, asideColGroup = _a.asideColGroup, leftHeaderColGroup = _a.leftHeaderColGroup, headerColGroup = _a.headerColGroup, bodyTable = _a.bodyTable, asideBodyRowData = _a.asideBodyRowData, asideBodyGroupingData = _a.asideBodyGroupingData, leftBodyRowData = _a.leftBodyRowData, leftBodyGroupingData = _a.leftBodyGroupingData, bodyRowData = _a.bodyRowData, bodyGroupingData = _a.bodyGroupingData, scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop, CTInnerWidth = _a.CTInnerWidth, CTInnerHeight = _a.CTInnerHeight, list = _a.list, onMouseDownBody = _a.onMouseDownBody;
        if (!mounted)
            return null;
        var scrollPaddingLeft = (headerColGroup[0]) ? headerColGroup[0]._sx : 0;
        var topBodyScrollConfig = {
            sRowIndex: 0,
            eRowIndex: options.frozenRowIndex
        };
        var bodyScrollConfig = {
            sRowIndex: Math.floor(-scrollTop / styles.bodyTrHeight) + options.frozenRowIndex,
            eRowIndex: (Math.floor(-scrollTop / styles.bodyTrHeight) + options.frozenRowIndex) + Math.ceil(styles.bodyHeight / styles.bodyTrHeight) + 1
        };
        var topAsideBodyPanelStyle = {
            left: 0,
            width: styles.asidePanelWidth,
            top: 0,
            height: styles.frozenRowHeight
        };
        var bottomAsideBodyPanelStyle = {
            left: 0,
            width: styles.asidePanelWidth,
            top: styles.bodyHeight - styles.footSumHeight,
            height: styles.footSumHeight
        };
        var asideBodyPanelStyle = {
            left: 0,
            width: styles.asidePanelWidth,
            top: styles.frozenRowHeight,
            height: styles.bodyHeight - styles.frozenRowHeight - styles.footSumHeight
        };
        var topLeftBodyPanelStyle = {
            left: styles.asidePanelWidth,
            width: styles.frozenPanelWidth,
            top: 0,
            height: styles.frozenRowHeight
        };
        var bottomLeftBodyPanelStyle = {
            left: styles.asidePanelWidth,
            width: styles.frozenPanelWidth,
            top: styles.bodyHeight - styles.footSumHeight,
            height: styles.footSumHeight
        };
        var leftBodyPanelStyle = {
            left: styles.asidePanelWidth,
            width: styles.frozenPanelWidth,
            top: styles.frozenRowHeight,
            height: styles.bodyHeight - styles.frozenRowHeight - styles.footSumHeight
        };
        var topBodyPanelStyle = {
            left: styles.frozenPanelWidth + styles.asidePanelWidth,
            width: styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth,
            top: 0,
            height: styles.frozenRowHeight
        };
        var bottomBodyPanelStyle = {
            left: styles.frozenPanelWidth + styles.asidePanelWidth,
            width: styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth,
            top: styles.bodyHeight - styles.footSumHeight,
            height: styles.footSumHeight
        };
        var bodyPanelStyle = {
            left: styles.frozenPanelWidth + styles.asidePanelWidth,
            width: styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth,
            top: styles.frozenRowHeight,
            height: styles.bodyHeight - styles.frozenRowHeight - styles.footSumHeight
        };
        var topBodyScrollStyle = {
            left: scrollLeft
        };
        var asideBodyScrollStyle = {
            top: scrollTop
        };
        var leftBodyScrollStyle = {
            top: scrollTop
        };
        var bodyScrollStyle = {
            left: scrollLeft,
            top: scrollTop
        };
        var bottomBodyScrollStyle = {
            left: scrollLeft
        };
        return (<div className={classnames_1["default"]('axd-body')} style={{ height: styles.bodyHeight }} onMouseDown={function (e) { return onMouseDownBody(e); }}>
        {(styles.asidePanelWidth > 0 && styles.frozenRowHeight > 0) ? this.paintBodyTemp('top-aside-body', topAsideBodyPanelStyle) : null}
        {(styles.frozenPanelWidth > 0 && styles.frozenRowHeight > 0) ? this.paintBodyTemp('top-left-body', topLeftBodyPanelStyle) : null}
        {(styles.frozenRowHeight > 0) ? (<div data-scroll-container='top-body-scroll-container' style={topBodyPanelStyle}>
            {this.paintBodyTemp('top-body-scroll', topBodyScrollStyle)}
          </div>) : null}

        {(styles.asidePanelWidth > 0) ? (<div data-scroll-container='aside-body-scroll-container' style={asideBodyPanelStyle}>
            {this.paintBody('aside-body-scroll', asideColGroup, asideBodyRowData, asideBodyGroupingData, list, bodyScrollConfig, asideBodyScrollStyle)}
          </div>) : null}

        {(styles.frozenPanelWidth > 0) ? (<div data-scroll-container='left-body-scroll-container' style={leftBodyPanelStyle}>
            {this.paintBody('left-body-scroll', leftHeaderColGroup, leftBodyRowData, leftBodyGroupingData, list, bodyScrollConfig, leftBodyScrollStyle)}
          </div>) : null}

        <div data-scroll-container='body-scroll-container' style={bodyPanelStyle}>
          {this.paintBody('body-scroll', headerColGroup, bodyRowData, bodyGroupingData, list, Object.assign({}, bodyScrollConfig, { paddingLeft: scrollPaddingLeft }), bodyScrollStyle)}
        </div>

        {(styles.asidePanelWidth > 0 && styles.footSumHeight > 0) ? this.paintBodyTemp('bottom-aside-body', bottomAsideBodyPanelStyle) : null}
        {(styles.frozenPanelWidth > 0 && styles.footSumHeight > 0) ? this.paintBodyTemp('bottom-left-body', bottomLeftBodyPanelStyle) : null}
        {(styles.footSumHeight > 0) ? (<div data-scroll-container='bottom-body-scroll-container' style={bottomBodyPanelStyle}>
            {this.paintBodyTemp('bottom-body-scroll', bottomBodyScrollStyle)}
          </div>) : null}
      </div>);
    };
    return GridBody;
}(React.Component));
exports.GridBody = GridBody;
