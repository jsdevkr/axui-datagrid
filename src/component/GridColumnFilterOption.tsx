import * as React from 'react';
import classNames from 'classnames'

export class GridColumnFilterOption extends React.Component<iGridColumnFilterOptionProps, iGridColumnFilterOptionState> {
  constructor( props: iGridColumnFilterOptionProps ) {
    super( props );

    this.state = {};
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

  public render() {
    const {
            options,
            onChange
          } = this.props;


    return <div data-options=''>
      {options.map( ( option, i ) => {
        return <div
          key={i}
          data-option
          data-checked={option.checked}
          onClick={e => {
            onChange( option.value, !option.checked, option.checkAll );
          }}
        >
          <div className={classNames( 'axd-option-check-box' )} />
          <span className={classNames( 'axd-option-text' )}>{option.text}</span>
        </div>;
      } )}
    </div>
  }
}
