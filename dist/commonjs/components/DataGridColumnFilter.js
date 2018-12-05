"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var hoc_1 = require("../hoc");
var utils_1 = require("../utils");
var DataGridColumnFilterOption_1 = require("./DataGridColumnFilterOption");
var _enums_1 = require("../common/@enums");
var DatagridColumnFilter = /** @class */ (function (_super) {
    __extends(DatagridColumnFilter, _super);
    function DatagridColumnFilter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.onChange = function (filterOptions, value, checked, isCheckAll) {
            var _a;
            var _b = _this.props, _c = _b.isColumnFilter, isColumnFilter = _c === void 0 ? false : _c, filterInfo = _b.filterInfo, dispatch = _b.dispatch;
            if (isColumnFilter === false || !utils_1.isNumber(isColumnFilter)) {
                return;
            }
            var currentFilterInfo = __assign({}, filterInfo);
            if (isCheckAll) {
                if (checked) {
                    currentFilterInfo[isColumnFilter] = false;
                }
                else {
                    currentFilterInfo[isColumnFilter] = (_a = {},
                        _a['_CHECK_ALL_'] = false,
                        _a);
                }
            }
            else {
                var filter_1 = {};
                var isAllChecked_1 = true;
                if (isColumnFilter in currentFilterInfo) {
                    filterOptions.forEach(function (O) {
                        if (O.value !== '_CHECK_ALL_') {
                            if (O.value === value) {
                                filter_1[O.value] = checked;
                            }
                            else {
                                filter_1[O.value] =
                                    currentFilterInfo[isColumnFilter] === false
                                        ? true
                                        : currentFilterInfo[isColumnFilter][O.value];
                            }
                            if (!filter_1[O.value]) {
                                isAllChecked_1 = false;
                            }
                        }
                    });
                }
                else {
                    filterOptions.forEach(function (O) {
                        if (O.value !== '_CHECK_ALL_') {
                            if (O.value === value) {
                                filter_1[O.value] = checked;
                            }
                            else {
                                filter_1[O.value] = true;
                            }
                            if (!filter_1[O.value]) {
                                isAllChecked_1 = false;
                            }
                        }
                    });
                }
                filter_1._CHECK_ALL_ = isAllChecked_1;
                currentFilterInfo[isColumnFilter] = isAllChecked_1
                    ? false
                    : filter_1;
            }
            dispatch(_enums_1.DispatchTypes.FILTER, {
                colIndex: isColumnFilter,
                filterInfo: currentFilterInfo,
            });
        };
        return _this;
    }
    DatagridColumnFilter.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.isColumnFilter, isColumnFilter = _b === void 0 ? false : _b, _c = _a.colGroup, colGroup = _c === void 0 ? [] : _c, _d = _a.options, options = _d === void 0 ? {} : _d, _e = _a.styles, styles = _e === void 0 ? {} : _e, _f = _a.scrollLeft, scrollLeft = _f === void 0 ? 0 : _f, _g = _a.filterInfo, filterInfo = _g === void 0 ? {} : _g, _h = _a.data, data = _h === void 0 ? [] : _h, predefinedFormatter = _a.predefinedFormatter;
        var _j = options.columnKeys, optionColumnKeys = _j === void 0 ? {} : _j;
        var _k = styles.bodyHeight, bodyHeight = _k === void 0 ? 0 : _k;
        var _l = styles.CTInnerWidth, CTInnerWidth = _l === void 0 ? 0 : _l, _m = styles.headerHeight, headerHeight = _m === void 0 ? 0 : _m, _o = styles.asidePanelWidth, asidePanelWidth = _o === void 0 ? 0 : _o;
        var optionItemHeight = 20;
        var filterWidth = 180;
        if (isColumnFilter === false || !utils_1.isNumber(isColumnFilter)) {
            return null;
        }
        var columnFilterInfo = filterInfo[isColumnFilter];
        var filterOptions = utils_1.uniqBy(data
            .filter(function (n) {
            return !n[optionColumnKeys.deleted || '_deleted_'];
        })
            .map(function (item) {
            var value = item[colGroup[isColumnFilter].key || ''];
            var text = value;
            var checked = false;
            var formatter = colGroup[isColumnFilter].formatter;
            if (typeof value === 'undefined') {
                value = '_UNDEFINED_';
                text = '값 없음';
            }
            if (typeof columnFilterInfo === 'undefined' ||
                columnFilterInfo === false) {
                checked = true;
            }
            else if (typeof columnFilterInfo !== 'undefined' &&
                columnFilterInfo !== false &&
                typeof columnFilterInfo[value] === 'undefined') {
                checked = columnFilterInfo._CHECK_ALL_;
            }
            else if (value in columnFilterInfo) {
                checked = columnFilterInfo[value];
            }
            else {
                checked = columnFilterInfo._CHECK_ALL_;
            }
            var formatterData = {
                value: value,
                text: text,
            };
            if (typeof predefinedFormatter === 'undefined') {
            }
            else if (typeof formatter === 'string' &&
                formatter in predefinedFormatter) {
                text = predefinedFormatter[formatter](formatterData);
            }
            else if (utils_1.isFunction(formatter)) {
                text = formatter(formatterData);
            }
            return {
                value: value,
                text: text,
                checked: checked,
            };
        })
            .sort(function (a, b) {
            return +(a.value > b.value) || +(a.value === b.value) - 1;
        }), 'value');
        filterOptions.splice(0, 0, {
            value: '_CHECK_ALL_',
            text: '전체선택',
            checkAll: true,
            checked: typeof columnFilterInfo === 'undefined' ||
                columnFilterInfo === false ||
                columnFilterInfo._CHECK_ALL_,
        });
        var filterStyles = {
            top: headerHeight - 2,
            left: 100,
            width: filterWidth,
            height: Math.min(bodyHeight, (filterOptions.length + 1) * optionItemHeight),
        };
        filterStyles.left =
            asidePanelWidth +
                (colGroup[isColumnFilter]._sx || 0) -
                2 +
                scrollLeft;
        if (filterStyles.left + filterWidth > CTInnerWidth) {
            filterStyles.left =
                asidePanelWidth +
                    (colGroup[isColumnFilter]._ex || 0) -
                    2 +
                    scrollLeft -
                    filterWidth;
        }
        return (React.createElement("div", { "data-column-filter": "true", className: "axui-datagrid-column-filter", style: filterStyles },
            React.createElement(DataGridColumnFilterOption_1.default, { filterOptions: filterOptions, optionItemHeight: optionItemHeight, onChange: function (value, checked, checkAll) {
                    _this.onChange(filterOptions, value, checked, checkAll);
                } })));
    };
    return DatagridColumnFilter;
}(React.Component));
exports.default = hoc_1.connectStore(DatagridColumnFilter);
