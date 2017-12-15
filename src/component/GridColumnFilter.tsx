import * as React from 'react';
import classNames from 'classnames'
import { iGridColumnFilter } from '../_inc/namespaces';

export class GridColumnFilter extends React.Component<iGridColumnFilter.Props, iGridColumnFilter.State> {
  constructor(props: iGridColumnFilter.Props) {
    super(props);

  }

  public shouldComponentUpdate(nextProps, nextState) {

    let sameProps = true; // 필터 조건 개발완료 후 false로 변경

    if (
      this.props.columnFilter !== nextProps.columnFilter
    ) {
      // sameProps = true;
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

    // if (columnFilter === false) return null;

    const filterWidth: number = 180;
    let filterStyles = {
      top: styles.headerHeight - 2,
      left: 100,
      width: filterWidth,
      maxHeight: styles.bodyHeight
    };

    if (columnFilter === true) {
      filterStyles.left = styles.asidePanelWidth + colGroup[ columnFilter.colIndex ]._sx - 2 + scrollLeft;
      if (filterStyles.left + filterWidth > styles.CTInnerWidth) {
        filterStyles.left = styles.asidePanelWidth + colGroup[ columnFilter.colIndex ]._ex - 2 + scrollLeft - filterWidth;
      }
    }

    return (
      <div
        data-column-filter='true'
        className={classNames(gridCSS.columnFilter)}
        style={filterStyles}
      >
        <a href=''>TEST</a>
        <a href=''>TEST</a>
        <a href=''>TEST</a>
      </div>
    )
  }
}
