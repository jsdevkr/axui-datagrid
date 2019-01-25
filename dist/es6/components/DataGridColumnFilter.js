"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const hoc_1 = require("../hoc");
const utils_1 = require("../utils");
const DataGridColumnFilterOption_1 = require("./DataGridColumnFilterOption");
const _enums_1 = require("../common/@enums");
class DatagridColumnFilter extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.onChange = (filterOptions, value, checked, isCheckAll) => {
            const { isColumnFilter = false, filterInfo, dispatch } = this.props;
            if (isColumnFilter === false || !utils_1.isNumber(isColumnFilter)) {
                return;
            }
            let currentFilterInfo = Object.assign({}, filterInfo);
            if (isCheckAll) {
                if (checked) {
                    currentFilterInfo[isColumnFilter] = false;
                }
                else {
                    currentFilterInfo[isColumnFilter] = {
                        ['_CHECK_ALL_']: false,
                    };
                }
            }
            else {
                let filter = {};
                let isAllChecked = true;
                if (isColumnFilter in currentFilterInfo) {
                    filterOptions.forEach((O) => {
                        if (O.value !== '_CHECK_ALL_') {
                            if (O.value === value) {
                                filter[O.value] = checked;
                            }
                            else {
                                filter[O.value] =
                                    currentFilterInfo[isColumnFilter] === false
                                        ? true
                                        : currentFilterInfo[isColumnFilter][O.value];
                            }
                            if (!filter[O.value]) {
                                isAllChecked = false;
                            }
                        }
                    });
                }
                else {
                    filterOptions.forEach((O) => {
                        if (O.value !== '_CHECK_ALL_') {
                            if (O.value === value) {
                                filter[O.value] = checked;
                            }
                            else {
                                filter[O.value] = true;
                            }
                            if (!filter[O.value]) {
                                isAllChecked = false;
                            }
                        }
                    });
                }
                filter._CHECK_ALL_ = isAllChecked;
                currentFilterInfo[isColumnFilter] = isAllChecked
                    ? false
                    : filter;
            }
            dispatch(_enums_1.DataGridEnums.DispatchTypes.FILTER, {
                colIndex: isColumnFilter,
                filterInfo: currentFilterInfo,
            });
        };
    }
    render() {
        const { isColumnFilter = false, colGroup = [], options = {}, styles = {}, scrollLeft = 0, filterInfo = {}, data = [], predefinedFormatter, } = this.props;
        const { columnKeys: optionColumnKeys = {} } = options;
        const { bodyHeight = 0 } = styles;
        const { elWidth = 0, headerHeight = 0, asidePanelWidth = 0 } = styles;
        const optionItemHeight = 20;
        const filterWidth = 180;
        if (isColumnFilter === false || !utils_1.isNumber(isColumnFilter)) {
            return null;
        }
        let columnFilterInfo = filterInfo[isColumnFilter];
        let filterOptions = utils_1.uniqBy(data
            .filter((n) => {
            return !n[optionColumnKeys.deleted || '_deleted_'];
        })
            .map(item => {
            let value = item[colGroup[isColumnFilter].key || ''];
            let text = value;
            let checked = false;
            let formatter = colGroup[isColumnFilter].formatter;
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
            const formatterData = {
                value,
                text,
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
            .sort((a, b) => {
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
        let filterStyles = {
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
        if (filterStyles.left + filterWidth > elWidth) {
            filterStyles.left =
                asidePanelWidth +
                    (colGroup[isColumnFilter]._ex || 0) -
                    2 +
                    scrollLeft -
                    filterWidth;
        }
        return (React.createElement("div", { "data-column-filter": "true", className: "axui-datagrid-column-filter", style: filterStyles },
            React.createElement(DataGridColumnFilterOption_1.default, { filterOptions: filterOptions, optionItemHeight: optionItemHeight, onChange: (value, checked, checkAll) => {
                    this.onChange(filterOptions, value, checked, checkAll);
                } })));
    }
}
exports.default = hoc_1.connectStore(DatagridColumnFilter);
