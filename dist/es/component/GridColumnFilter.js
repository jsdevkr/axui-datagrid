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
var classnames_1 = require("classnames");
var immutable_1 = require("immutable");
var uniqBy_1 = require("lodash-es/uniqBy");
var GridColumnFilter = /** @class */ (function (_super) {
    __extends(GridColumnFilter, _super);
    function GridColumnFilter(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }
    /*
      public shouldComponentUpdate(nextProps, nextState) {
  
        let sameProps = false;
  
        if (this.state.filterInfo !== nextState.filterInfo) {
          this.props.onChangeColumnFilter(this.props.columnFilter.colIndex, this.state.filterInfo);
          sameProps = true;
        }
  
        if (
          this.props.columnFilter !== nextProps.columnFilter
        ) {
          sameProps = true;
        }
  
        return sameProps;
      }
    */
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
                            filter_1[O['value']] = (filterInfo[colIndex] === false) ? true : filterInfo[colIndex][O['value']];
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
    GridColumnFilter.prototype.getOptions = function () {
        var _this = this;
        var _a = this.props, isColumnFilter = _a.isColumnFilter, colGroup = _a.colGroup, options = _a.options, list = _a.list, filterInfo = _a.filterInfo;
        var columnFilterInfo = filterInfo.get('' + isColumnFilter);
        var arr = uniqBy_1["default"](list
            .filter(function (item) { return (item ? !item[options.columnKeys.deleted] : false); })
            .map(function (item) {
            var value = item[colGroup[isColumnFilter].key];
            var text = value;
            var checked = false;
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
        })
            .toJS(), 'value');
        arr.splice(0, 0, {
            value: '__CHECK_ALL__',
            text: '전체선택',
            checkAll: true,
            checked: (typeof columnFilterInfo === 'undefined' || columnFilterInfo === false || columnFilterInfo['__CHECK_ALL__'])
        });
        return arr.map(function (option, i) {
            return <div key={i} data-option data-checked={option.checked} onClick={function (e) {
                _this.onChange(isColumnFilter, arr, option.value, !option.checked, option.checkAll);
            }}>
        <div className={classnames_1["default"]('axd-option-check-box')}/>
        <span className={classnames_1["default"]('axd-option-text')}>{option.text}</span>
      </div>;
        });
    };
    GridColumnFilter.prototype.render = function () {
        var _a = this.props, isColumnFilter = _a.isColumnFilter, colGroup = _a.colGroup, styles = _a.styles, scrollLeft = _a.scrollLeft;
        if (isColumnFilter === false)
            return null;
        var filterWidth = 180;
        var filterStyles = {
            top: styles.headerHeight - 2,
            left: 100,
            width: filterWidth,
            maxHeight: styles.bodyHeight
        };
        filterStyles.left = styles.asidePanelWidth + colGroup[isColumnFilter]._sx - 2 + scrollLeft;
        if (filterStyles.left + filterWidth > styles.CTInnerWidth) {
            filterStyles.left = styles.asidePanelWidth + colGroup[isColumnFilter]._ex - 2 + scrollLeft - filterWidth;
        }
        return (<div data-column-filter='true' className={classnames_1["default"]('axd-column-filter')} style={filterStyles}>
        <div data-options=''>
          {this.getOptions()}
        </div>
      </div>);
    };
    return GridColumnFilter;
}(React.Component));
exports.GridColumnFilter = GridColumnFilter;
