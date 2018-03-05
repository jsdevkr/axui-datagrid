"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const immutable_1 = require("immutable");
const uniqBy_1 = __importDefault(require("lodash-es/uniqBy"));
const GridColumnFilterOption_1 = require("./GridColumnFilterOption");
class GridColumnFilter extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onChange = this.onChange.bind(this);
    }
    onChange(colIndex, filterOptions, value, checked, isCheckAll) {
        const { onChangeColumnFilter } = this.props;
        filterOptions = immutable_1.List(filterOptions);
        let filterInfo = this.props.filterInfo.toJS();
        if (isCheckAll) {
            if (checked) {
                filterInfo[colIndex] = false;
            }
            else {
                filterInfo[colIndex] = {
                    ['__CHECK_ALL__']: false
                };
            }
        }
        else {
            let filter = {};
            let isAllChecked = true;
            if (colIndex in filterInfo) {
                filterOptions.forEach(O => {
                    if (O['value'] !== '__CHECK_ALL__') {
                        if (O['value'] === value) {
                            filter[O['value']] = checked;
                        }
                        else {
                            filter[O['value']] = (filterInfo[colIndex] === false) ? true : filterInfo[colIndex][O['value']];
                        }
                        if (!filter[O['value']])
                            isAllChecked = false;
                    }
                });
            }
            else {
                filterOptions.forEach(O => {
                    if (O['value'] !== '__CHECK_ALL__') {
                        if (O['value'] === value) {
                            filter[O['value']] = checked;
                        }
                        else {
                            filter[O['value']] = true;
                        }
                        if (!filter[O['value']])
                            isAllChecked = false;
                    }
                });
            }
            filter['__CHECK_ALL__'] = isAllChecked;
            filterInfo[colIndex] = filter;
        }
        onChangeColumnFilter(colIndex, filterInfo);
    }
    render() {
        const { isColumnFilter, colGroup, styles, options, scrollLeft, filterInfo, list } = this.props;
        if (isColumnFilter === false)
            return null;
        let columnFilterInfo = filterInfo.get('' + isColumnFilter);
        let filterOptions = uniqBy_1.default(list
            .filter(item => (item ? !item[options.columnKeys.deleted] : false))
            .map(item => {
            let value = item[colGroup[Number(isColumnFilter)].key];
            let text = value;
            let checked = false;
            if (typeof value === 'undefined') {
                value = '__UNDEFINED__';
                text = '값 없음';
            }
            if (typeof columnFilterInfo === 'undefined' || columnFilterInfo === false) {
                checked = true;
            }
            else if (typeof columnFilterInfo !== 'undefined' && columnFilterInfo !== false && typeof columnFilterInfo[value] === 'undefined') {
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
                checked: checked
            };
        }).toJS(), 'value');
        filterOptions.splice(0, 0, {
            value: '__CHECK_ALL__',
            text: '전체선택',
            checkAll: true,
            checked: (typeof columnFilterInfo === 'undefined' || columnFilterInfo === false || columnFilterInfo['__CHECK_ALL__'])
        });
        const filterWidth = 180;
        let filterStyles = {
            top: styles.headerHeight - 2,
            left: 100,
            width: filterWidth,
            height: styles.bodyHeight
        };
        filterStyles.left = styles.asidePanelWidth + colGroup[Number(isColumnFilter)]._sx - 2 + scrollLeft;
        if (filterStyles.left + filterWidth > styles.CTInnerWidth) {
            filterStyles.left = styles.asidePanelWidth + colGroup[Number(isColumnFilter)]._ex - 2 + scrollLeft - filterWidth;
        }
        return (react_1.default.createElement("div", { "data-column-filter": 'true', className: classnames_1.default('axd-column-filter'), style: filterStyles },
            react_1.default.createElement(GridColumnFilterOption_1.GridColumnFilterOption, { options: filterOptions, onChange: (value, checked, checkAll) => {
                    this.onChange(isColumnFilter, filterOptions, value, checked, checkAll);
                } })));
    }
}
exports.GridColumnFilter = GridColumnFilter;
//# sourceMappingURL=GridColumnFilter.js.map