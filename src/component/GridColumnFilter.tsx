import * as React from 'react';
import classNames from 'classnames'
import { List } from 'immutable';
import uniqBy from 'lodash-es/uniqBy';

export class GridColumnFilter extends React.Component<iGridColumnFilterProps, iGridColumnFilterState> {
  constructor( props: iGridColumnFilterProps ) {
    super( props );

    this.state = {};

    this.onChange = this.onChange.bind( this );
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

  private onChange( colIndex, filterOptions, value, checked, isCheckAll ) {
    const {
            onChangeColumnFilter
          } = this.props;


    filterOptions = List( filterOptions );
    let filterInfo = this.props.filterInfo.toJS();

    if ( isCheckAll ) {
      if ( checked ) {
        filterInfo[ colIndex ] = false;
      } else {
        filterInfo[ colIndex ] = {
          ['__CHECK_ALL__']: false
        };
      }
    }
    else {

      let filter = {};
      let isAllChecked = true;

      if ( colIndex in filterInfo ) {
        filterOptions.forEach( O => {
          if ( O[ 'value' ] !== '__CHECK_ALL__' ) {
            if ( O[ 'value' ] === value ) {
              filter[ O[ 'value' ] ] = checked;
            } else {
              filter[ O[ 'value' ] ] = (filterInfo[ colIndex ] === false) ? true : filterInfo[ colIndex ][ O[ 'value' ] ];
            }
            if ( !filter[ O[ 'value' ] ] ) isAllChecked = false;
          }
        } );
      }
      else {
        filterOptions.forEach( O => {
          if ( O[ 'value' ] !== '__CHECK_ALL__' ) {
            if ( O[ 'value' ] === value ) {
              filter[ O[ 'value' ] ] = checked;
            } else {
              filter[ O[ 'value' ] ] = true;
            }
            if ( !filter[ O[ 'value' ] ] ) isAllChecked = false;
          }
        } );
      }

      filter[ '__CHECK_ALL__' ] = isAllChecked;
      filterInfo[ colIndex ] = filter;
    }

    onChangeColumnFilter( colIndex, filterInfo );
  }

  private getOptions() {
    const {
            isColumnFilter,
            colGroup,
            options,
            list,
            filterInfo
          } = this.props;

    let columnFilterInfo = filterInfo.get( '' + isColumnFilter );

    let arr = uniqBy( list
      .filter( item => (item ? !item[ options.columnKeys.deleted ] : false) )
      .map( item => {
        let value = item[ colGroup[ isColumnFilter ].key ];
        let text: string = value;
        let checked: boolean = false;

        if ( typeof value === 'undefined' ) {
          value = '__UNDEFINED__';
          text = '값 없음';
        }

        if ( typeof columnFilterInfo === 'undefined' || columnFilterInfo === false ) {
          checked = true;
        }
        else if ( typeof columnFilterInfo !== 'undefined' && columnFilterInfo !== false && typeof columnFilterInfo[ value ] === 'undefined' ) {
          checked = columnFilterInfo[ '__CHECK_ALL__' ];
        }
        else if ( value in columnFilterInfo ) {
          checked = columnFilterInfo[ value ];
        }
        else {
          checked = columnFilterInfo[ '__CHECK_ALL__' ];
        }

        return {
          value: value,
          text: text,
          checked: checked
        };
      } )
      .toJS(), 'value' );

    arr.splice( 0, 0, {
      value: '__CHECK_ALL__',
      text: '전체선택',
      checkAll: true,
      checked: (typeof columnFilterInfo === 'undefined' || columnFilterInfo === false || columnFilterInfo[ '__CHECK_ALL__' ])
    } );

    return arr.map( ( option, i ) => {
      return <div
        key={i}
        data-option
        data-checked={option.checked}
        onClick={e => {
          this.onChange( isColumnFilter, arr, option.value, !option.checked, option.checkAll );
        }}
      >
        <div className={classNames( 'axd-option-check-box' )} />
        <span className={classNames( 'axd-option-text' )}>{option.text}</span>
      </div>;
    } );
  }

  public render() {
    const {
            isColumnFilter,
            colGroup,
            styles,
            scrollLeft
          } = this.props;

    if ( isColumnFilter === false ) return null;

    const filterWidth: number = 180;

    let filterStyles = {
      top: styles.headerHeight - 2,
      left: 100,
      width: filterWidth,
      maxHeight: styles.bodyHeight
    };

    filterStyles.left = styles.asidePanelWidth + colGroup[ isColumnFilter ]._sx - 2 + scrollLeft;
    if ( filterStyles.left + filterWidth > styles.CTInnerWidth ) {
      filterStyles.left = styles.asidePanelWidth + colGroup[ isColumnFilter ]._ex - 2 + scrollLeft - filterWidth;
    }

    return (
      <div
        data-column-filter='true'
        className={classNames( 'axd-column-filter' )}
        style={filterStyles}
      >
        <div data-options=''>
          {this.getOptions()}
        </div>
      </div>
    )
  }
}
