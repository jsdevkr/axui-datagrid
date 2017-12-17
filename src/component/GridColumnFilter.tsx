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
            list
          } = this.props;
    const onChangeCheckbox = (e) => {
      console.log(e.target.value, e.target.checked, e.target.getAttribute('data-check-all'));
    };

    let arr = uniqBy(list
      .filter(item => (item ? !item[ options.columnKeys.deleted ] : false))
      .map(item => {
        return {value: item[ colGroup[ columnFilter.colIndex ].key ] || '값 없음', checked: true};
      })
      .toJS(), 'value');

    arr.splice(0, 0, {value: '전체선택', checked: true, checkAll: true});

    return arr.map((option, i) => {
      return <div key={i} data-option='' className=''>
        <label>
          <input
            type='checkbox'
            data-check-all={option.checkAll}
            name={colGroup[ columnFilter.colIndex ].key}
            defaultChecked={option.checked}
            value={option.value}
            onChange={onChangeCheckbox}
          /> {option.value}
        </label>
      </div>;
    });
  }

  public shouldComponentUpdate(nextProps, nextState) {

    let sameProps = false;

    if (
      this.props.columnFilter !== nextProps.columnFilter
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
