import * as React from 'react';
import { types, DispatchTypes } from '../stores';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import { isNumber, uniqBy } from '../utils';
import DataGridColumnFilterOption from './DataGridColumnFilterOption';

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
          ['__CHECK_ALL__']: false,
        };
      }
    } else {
      let filter: { [key: string]: any } = {};
      let isAllChecked = true;

      if ((isColumnFilter as number) in currentFilterInfo) {
        filterOptions.forEach((O: any) => {
          if (O.value !== '__CHECK_ALL__') {
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
          if (O.value !== '__CHECK_ALL__') {
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

      filter.__CHECK_ALL__ = isAllChecked;
      currentFilterInfo[isColumnFilter as number] = filter;
    }

    dispatch(DispatchTypes.FILTER, {
      colIndex: isColumnFilter as number,
      filterInfo: currentFilterInfo,
    });
  };

  render() {
    const {
      isColumnFilter = false,
      colGroup = [],
      styles = {},
      options = {},
      scrollLeft = 0,
      filterInfo = {},
      filteredList = [],
    } = this.props;
    const { CTInnerWidth = 0, headerHeight = 0, asidePanelWidth = 0 } = styles;

    if (isColumnFilter === false || !isNumber(isColumnFilter)) {
      return null;
    }

    let columnFilterInfo = filterInfo[isColumnFilter as number];
    let filterOptions = uniqBy(
      filteredList.map(item => {
        let value = item[colGroup[isColumnFilter as number].key || ''];
        let text: string = value;
        let checked: boolean = false;

        if (typeof value === 'undefined') {
          value = '__UNDEFINED__';
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
          checked = columnFilterInfo.__CHECK_ALL__;
        } else if (value in columnFilterInfo) {
          checked = columnFilterInfo[value];
        } else {
          checked = columnFilterInfo.__CHECK_ALL__;
        }

        return {
          value: value,
          text: text,
          checked: checked,
        };
      }),
      'value',
    );

    filterOptions.splice(0, 0, {
      value: '__CHECK_ALL__',
      text: '전체선택',
      checkAll: true,
      checked:
        typeof columnFilterInfo === 'undefined' ||
        columnFilterInfo === false ||
        columnFilterInfo.__CHECK_ALL__,
    });

    const filterWidth: number = 180;

    let filterStyles = {
      top: headerHeight - 2,
      left: 100,
      width: filterWidth,
      height: styles.bodyHeight,
    };

    filterStyles.left =
      asidePanelWidth +
      (colGroup[isColumnFilter as number]._sx || 0) -
      2 +
      scrollLeft;

    if (filterStyles.left + filterWidth > CTInnerWidth) {
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
          onChange={(value, checked, checkAll) => {
            this.onChange(filterOptions, value, checked, checkAll);
          }}
        />
      </div>
    );
  }
}

export default connectStore(DatagridColumnFilter);
