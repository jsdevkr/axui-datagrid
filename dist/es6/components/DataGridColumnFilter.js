"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const stores_1 = require("../stores");
const hoc_1 = require("../hoc");
const utils_1 = require("../utils");
const DataGridColumnFilterOption_1 = require("./DataGridColumnFilterOption");
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
                        ['__CHECK_ALL__']: false,
                    };
                }
            }
            else {
                let filter = {};
                let isAllChecked = true;
                if (isColumnFilter in currentFilterInfo) {
                    filterOptions.forEach((O) => {
                        if (O.value !== '__CHECK_ALL__') {
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
                        if (O.value !== '__CHECK_ALL__') {
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
                filter.__CHECK_ALL__ = isAllChecked;
                currentFilterInfo[isColumnFilter] = filter;
            }
            dispatch(stores_1.DispatchTypes.FILTER, {
                colIndex: isColumnFilter,
                filterInfo: currentFilterInfo,
            });
        };
    }
    render() {
        const { isColumnFilter = false, colGroup = [], options = {}, styles = {}, scrollLeft = 0, filterInfo = {}, filteredList = [], data = [], } = this.props;
        const { columnKeys: optionColumnKeys = {} } = options;
        const { bodyHeight = 0 } = styles;
        const { CTInnerWidth = 0, headerHeight = 0, asidePanelWidth = 0 } = styles;
        const optionItemHeight = 20;
        const filterWidth = 180;
        if (isColumnFilter === false || !utils_1.isNumber(isColumnFilter)) {
            return null;
        }
        let columnFilterInfo = filterInfo[isColumnFilter];
        let filterOptions = utils_1.uniqBy(data
            .filter((n) => {
            return !n[optionColumnKeys.deleted || '__deleted__'];
        })
            .map(item => {
            let value = item[colGroup[isColumnFilter].key || ''];
            let text = value;
            let checked = false;
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
                checked = columnFilterInfo.__CHECK_ALL__;
            }
            else if (value in columnFilterInfo) {
                checked = columnFilterInfo[value];
            }
            else {
                checked = columnFilterInfo.__CHECK_ALL__;
            }
            return {
                value: value,
                text: text,
                checked: checked,
            };
        }), 'value');
        filterOptions.splice(0, 0, {
            value: '__CHECK_ALL__',
            text: '전체선택',
            checkAll: true,
            checked: typeof columnFilterInfo === 'undefined' ||
                columnFilterInfo === false ||
                columnFilterInfo.__CHECK_ALL__,
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
        if (filterStyles.left + filterWidth > CTInnerWidth) {
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
//# sourceMappingURL=DataGridColumnFilter.js.map