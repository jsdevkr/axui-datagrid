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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var immutable_1 = require("immutable");
var lodash_1 = require("lodash");
var GridColumnFilterOption_1 = require("./GridColumnFilterOption");
var GridColumnFilter = /** @class */ (function (_super) {
    __extends(GridColumnFilter, _super);
    function GridColumnFilter(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }
    GridColumnFilter.prototype.onChange = function (colIndex, filterOptions, value, checked, isCheckAll) {
        var onChangeColumnFilter = this.props.onChangeColumnFilter;
        filterOptions = immutable_1.List(filterOptions);
        var filterInfo = this.props.filterInfo.toJS();
        if (isCheckAll) {
            if (checked) {
                filterInfo[colIndex] = false;
            }
            else {
                filterInfo[colIndex] = (_a = {},
                    _a['__CHECK_ALL__'] = false,
                    _a);
            }
        }
        else {
            var filter_1 = {};
            var isAllChecked_1 = true;
            if (colIndex in filterInfo) {
                filterOptions.forEach(function (O) {
                    if (O['value'] !== '__CHECK_ALL__') {
                        if (O['value'] === value) {
                            filter_1[O['value']] = checked;
                        }
                        else {
                            filter_1[O['value']] =
                                filterInfo[colIndex] === false
                                    ? true
                                    : filterInfo[colIndex][O['value']];
                        }
                        if (!filter_1[O['value']])
                            isAllChecked_1 = false;
                    }
                });
            }
            else {
                filterOptions.forEach(function (O) {
                    if (O['value'] !== '__CHECK_ALL__') {
                        if (O['value'] === value) {
                            filter_1[O['value']] = checked;
                        }
                        else {
                            filter_1[O['value']] = true;
                        }
                        if (!filter_1[O['value']])
                            isAllChecked_1 = false;
                    }
                });
            }
            filter_1['__CHECK_ALL__'] = isAllChecked_1;
            filterInfo[colIndex] = filter_1;
        }
        onChangeColumnFilter(colIndex, filterInfo);
        var _a;
    };
    GridColumnFilter.prototype.render = function () {
        var _this = this;
        var _a = this.props, isColumnFilter = _a.isColumnFilter, colGroup = _a.colGroup, styles = _a.styles, options = _a.options, scrollLeft = _a.scrollLeft, filterInfo = _a.filterInfo, list = _a.list;
        if (isColumnFilter === false)
            return null;
        var columnFilterInfo = filterInfo.get('' + isColumnFilter);
        var filterOptions = lodash_1.uniqBy(list
            .filter(function (item) { return (item ? !item[options.columnKeys.deleted] : false); })
            .map(function (item) {
            var value = item[colGroup[Number(isColumnFilter)].key];
            var text = value;
            var checked = false;
            if (typeof value === 'undefined') {
                value = '__UNDEFINED__';
                text = '값 없음';
            }
            if (typeof columnFilterInfo === 'undefined' ||
                columnFilterInfo === false) {
                checked = true;
            }
            else if (typeof columnFilterInfo !== 'undefined' &&
                columnFilterInfo !== false &&
                typeof columnFilterInfo[value] === 'undefined') {
                checked = columnFilterInfo['__CHECK_ALL__'];
            }
            else if (value in columnFilterInfo) {
                checked = columnFilterInfo[value];
            }
            else {
                checked = columnFilterInfo['__CHECK_ALL__'];
            }
            return {
                value: value,
                text: text,
                checked: checked,
            };
        })
            .toJS(), 'value');
        filterOptions.splice(0, 0, {
            value: '__CHECK_ALL__',
            text: '전체선택',
            checkAll: true,
            checked: typeof columnFilterInfo === 'undefined' ||
                columnFilterInfo === false ||
                columnFilterInfo['__CHECK_ALL__'],
        });
        var filterWidth = 180;
        var filterStyles = {
            top: styles.headerHeight - 2,
            left: 100,
            width: filterWidth,
            height: styles.bodyHeight,
        };
        filterStyles.left =
            styles.asidePanelWidth +
                colGroup[Number(isColumnFilter)]._sx -
                2 +
                scrollLeft;
        if (filterStyles.left + filterWidth > styles.CTInnerWidth) {
            filterStyles.left =
                styles.asidePanelWidth +
                    colGroup[Number(isColumnFilter)]._ex -
                    2 +
                    scrollLeft -
                    filterWidth;
        }
        return (React.createElement("div", { "data-column-filter": "true", className: classnames_1.default('axd-column-filter'), style: filterStyles },
            React.createElement(GridColumnFilterOption_1.GridColumnFilterOption, { options: filterOptions, onChange: function (value, checked, checkAll) {
                    _this.onChange(isColumnFilter, filterOptions, value, checked, checkAll);
                } })));
    };
    return GridColumnFilter;
}(React.Component));
exports.GridColumnFilter = GridColumnFilter;
//# sourceMappingURL=GridColumnFilter.js.map