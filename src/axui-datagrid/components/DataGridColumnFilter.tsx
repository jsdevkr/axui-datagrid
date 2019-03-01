import * as React from 'react';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import { isNumber, uniqBy, isFunction } from '../utils';
import DataGridColumnFilterOption from './DataGridColumnFilterOption';
import { DataGridEnums } from '../common/@enums';
import { IDataGrid } from '../common/@types';

interface IProps extends IDataGridStore {}
interface IState {}

class DatagridColumnFilter extends React.Component<IProps, IState> {
  state = {};

  onChange = (
    filterOptions: any,
    value: any,
    checked: boolean,
    isCheckAll: boolean,
  ) => {
    const { isColumnFilter = false, filterInfo, dispatch } = this.props;

    if (isColumnFilter === false || !isNumber(isColumnFilter)) {
      return;
    }

    let currentFilterInfo = { ...filterInfo };

    if (isCheckAll) {
      if (checked) {
        currentFilterInfo[isColumnFilter as number] = false;
      } else {
        currentFilterInfo[isColumnFilter as number] = {
          ['_CHECK_ALL_']: false,
        };
      }
    } else {
      let filter: { [key: string]: any } = {};
      let isAllChecked = true;

      if ((isColumnFilter as number) in currentFilterInfo) {
        filterOptions.forEach((O: any) => {
          if (O.value !== '_CHECK_ALL_') {
            if (O.value === value) {
              filter[O.value] = checked;
            } else {
              filter[O.value] =
                currentFilterInfo[isColumnFilter as number] === false
                  ? true
                  : currentFilterInfo[isColumnFilter as number][O.value];
            }
            if (!filter[O.value]) {
              isAllChecked = false;
            }
          }
        });
      } else {
        filterOptions.forEach((O: any) => {
          if (O.value !== '_CHECK_ALL_') {
            if (O.value === value) {
              filter[O.value] = checked;
            } else {
              filter[O.value] = true;
            }
            if (!filter[O.value]) {
              isAllChecked = false;
            }
          }
        });
      }

      filter._CHECK_ALL_ = isAllChecked;
      currentFilterInfo[isColumnFilter as number] = isAllChecked
        ? false
        : filter;
    }

    dispatch(DataGridEnums.DispatchTypes.FILTER, {
      colIndex: isColumnFilter as number,
      filterInfo: currentFilterInfo,
    });
  };

  render() {
    const {
      isColumnFilter = false,
      colGroup = [],
      options = {},
      styles = {},
      scrollLeft = 0,
      filterInfo = {},
      data = [],
      predefinedFormatter,
    } = this.props;
    const { columnKeys: optionColumnKeys = {} } = options;
    const { bodyHeight = 0 } = styles;
    const { elWidth = 0, headerHeight = 0, asidePanelWidth = 0 } = styles;
    const optionItemHeight = 20;
    const filterWidth: number = 180;

    if (isColumnFilter === false || !isNumber(isColumnFilter)) {
      return null;
    }

    let columnFilterInfo = filterInfo[isColumnFilter as number];
    let filterOptions = uniqBy(
      data
        .filter((n: any) => {
          return (
            typeof n === 'undefined' ||
            !n[optionColumnKeys.deleted || '_deleted_']
          );
        })
        .map(item => {
          let value = item[colGroup[isColumnFilter as number].key || ''];
          let text: string = value;
          let checked: boolean = false;
          let formatter = colGroup[isColumnFilter as number].formatter;

          if (typeof value === 'undefined') {
            value = '_UNDEFINED_';
            text = '값 없음';
          }

          if (
            typeof columnFilterInfo === 'undefined' ||
            columnFilterInfo === false
          ) {
            checked = true;
          } else if (
            typeof columnFilterInfo !== 'undefined' &&
            columnFilterInfo !== false &&
            typeof columnFilterInfo[value] === 'undefined'
          ) {
            checked = columnFilterInfo._CHECK_ALL_;
          } else if (value in columnFilterInfo) {
            checked = columnFilterInfo[value];
          } else {
            checked = columnFilterInfo._CHECK_ALL_;
          }

          const formatterData = {
            value,
            text,
            // checked,
          };

          if (typeof predefinedFormatter === 'undefined') {
          } else if (
            typeof formatter === 'string' &&
            formatter in predefinedFormatter
          ) {
            text = predefinedFormatter[formatter](formatterData);
          } else if (isFunction(formatter)) {
            text = (formatter as IDataGrid.formatterFunction)(formatterData);
          }

          return {
            value: value,
            text: text,
            checked: checked,
          };
        })
        .sort((a, b) => {
          return +(a.value > b.value) || +(a.value === b.value) - 1;
        }),
      'value',
    );

    filterOptions.splice(0, 0, {
      value: '_CHECK_ALL_',
      text: '전체선택',
      checkAll: true,
      checked:
        typeof columnFilterInfo === 'undefined' ||
        columnFilterInfo === false ||
        columnFilterInfo._CHECK_ALL_,
    });

    let filterStyles = {
      top: headerHeight - 2,
      left: 100,
      width: filterWidth,
      height: Math.min(
        bodyHeight,
        (filterOptions.length + 1) * optionItemHeight,
      ),
    };

    filterStyles.left =
      asidePanelWidth +
      (colGroup[isColumnFilter as number]._sx || 0) -
      2 +
      scrollLeft;

    if (filterStyles.left + filterWidth > elWidth) {
      filterStyles.left =
        asidePanelWidth +
        (colGroup[isColumnFilter as number]._ex || 0) -
        2 +
        scrollLeft -
        filterWidth;
    }

    return (
      <div
        data-column-filter="true"
        className="axui-datagrid-column-filter"
        style={filterStyles}
      >
        <DataGridColumnFilterOption
          filterOptions={filterOptions}
          optionItemHeight={optionItemHeight}
          onChange={(value, checked, checkAll) => {
            this.onChange(filterOptions, value, checked, checkAll);
          }}
        />
      </div>
    );
  }
}

export default connectStore(DatagridColumnFilter);
