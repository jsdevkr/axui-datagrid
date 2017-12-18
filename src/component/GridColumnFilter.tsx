import * as React from 'react';
import classNames from 'classnames'
import { iGridColumnFilter } from '../_inc/namespaces';
import { uniqBy } from 'lodash';

export class GridColumnFilter extends React.Component<iGridColumnFilter.Props, iGridColumnFilter.State> {
  constructor(props: iGridColumnFilter.Props) {
    super(props);

  }

  private getOptions() {
    const {
            columnFilter,
            colGroup,
            options,
            list,
            filterInfo,
            onChangeColumnFilter
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
      return <div key={i} data-option='' className=''>
        <label>
          <input
            type='checkbox'
            name={colGroup[ columnFilter.colIndex ].key}
            value={option.value}
            checked={option.checked}
            onChange={e => {
              onChangeColumnFilter(columnFilter.colIndex, arr, e.target.value, e.target.checked, option.checkAll);
            }}
          /> {option.text}
        </label>
      </div>;
    });
  }

  public shouldComponentUpdate(nextProps, nextState) {

    let sameProps = false;

    if (
      this.props.columnFilter !== nextProps.columnFilter ||
      this.props.filterInfo !== nextProps.filterInfo
    ) {
      sameProps = true;
    }

    return sameProps;
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
