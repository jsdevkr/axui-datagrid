import * as React from 'react';
import classNames from 'classnames'
import { iGridColumnFilter } from '../_inc/namespaces';
import { List } from 'immutable';
import { uniqBy } from 'lodash';

export class GridColumnFilter extends React.Component<iGridColumnFilter.Props, iGridColumnFilter.State> {
  constructor(props: iGridColumnFilter.Props) {
    super(props);

    this.state = {};

    this.onChange = this.onChange.bind(this);
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

  private onChange(colIndex, filterOptions, value, checked, isCheckAll) {
    const {
            onChangeColumnFilter
          } = this.props;


    filterOptions = List(filterOptions);
    let filterInfo = this.props.filterInfo.toJS();

    if (isCheckAll) {
      if (checked) {
        filterInfo[ colIndex ] = false;
      } else {
        filterInfo[ colIndex ] = {
          ['__check_all__']: false
        };
      }
    }
    else {

      let filter = {};
      let isAllChecked = true;

      if (colIndex in filterInfo) {
        filterOptions.forEach(O => {
          if (O[ 'value' ] !== '__check_all__') {
            if (O[ 'value' ] === value) {
              if (checked) filter[ O[ 'value' ] ] = checked;
            } else {
              if (filterInfo[ colIndex ] && filterInfo[ colIndex ][ O[ 'value' ] ]) filter[ O[ 'value' ] ] = true;
            }
            if (!filter[ O[ 'value' ] ]) isAllChecked = false;
          }
        });
      }
      else {
        filterOptions.forEach(O => {
          if (O[ 'value' ] !== '__check_all__') {
            if (O[ 'value' ] === value) {
              if (checked) filter[ O[ 'value' ] ] = checked;
            } else {
              filter[ O[ 'value' ] ] = true;
            }
            if (!filter[ O[ 'value' ] ]) isAllChecked = false;
          }
        });
      }

      filter[ '__check_all__' ] = isAllChecked;
      filterInfo[ colIndex ] = filter;
    }

    onChangeColumnFilter(colIndex, filterInfo);
  }

  private getOptions() {
    const {
            gridCSS,
            columnFilter,
            colGroup,
            options,
            list,
            filterInfo
          } = this.props;

    let columnFilterInfo = filterInfo.get('' + columnFilter.colIndex);

    let arr = uniqBy(list
      .filter(item => (item ? !item[ options.columnKeys.deleted ] : false))
      .map(item => {
        const value = item[ colGroup[ columnFilter.colIndex ].key ];
        return {
          value: value,
          text: value || '값 없음',
          checked: (typeof columnFilterInfo === 'undefined' || columnFilterInfo === false || columnFilterInfo[ value ])
        };
      })
      .toJS(), 'value');

    arr.splice(0, 0, {
      value: '__check_all__',
      text: '전체선택',
      checkAll: true,
      checked: (typeof columnFilterInfo === 'undefined' || columnFilterInfo === false || columnFilterInfo[ '__check_all__' ])
    });

    return arr.map((option, i) => {
      return <div
        key={i}
        data-option={option.value}
        data-checked={option.checked}
        onClick={e => {
          this.onChange(columnFilter.colIndex, arr, option.value, !option.checked, option.checkAll);
        }}
      >
        <div className={classNames(gridCSS.checkBox)} />
        <span className={classNames(gridCSS.text)}>{option.text}</span>
      </div>;
    });
  }

  public render() {
    const {
            columnFilter,
            colGroup,
            gridCSS,
            styles,
            scrollLeft
          } = this.props;

    if (columnFilter === false) return null;

    const filterWidth: number = 180;

    let filterStyles = {
      top: styles.headerHeight - 2,
      left: 100,
      width: filterWidth,
      maxHeight: styles.bodyHeight
    };

    filterStyles.left = styles.asidePanelWidth + colGroup[ columnFilter.colIndex ]._sx - 2 + scrollLeft;
    if (filterStyles.left + filterWidth > styles.CTInnerWidth) {
      filterStyles.left = styles.asidePanelWidth + colGroup[ columnFilter.colIndex ]._ex - 2 + scrollLeft - filterWidth;
    }

    return (
      <div
        data-column-filter='true'
        className={classNames(gridCSS.columnFilter)}
        style={filterStyles}
      >
        <div data-options=''>
          {this.getOptions()}
        </div>
      </div>
    )
  }
}
