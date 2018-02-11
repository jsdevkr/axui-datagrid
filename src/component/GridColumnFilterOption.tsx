import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Range } from 'immutable';
import throttle from 'lodash-es/throttle';
import classNames from 'classnames';
import { getInnerHeight } from '../util';


export class GridColumnFilterOption extends React.Component<iAXDataGridColumnFilterOptionProps, iAXDataGridColumnFilterOptionState> {
  private throttled_onScroll: Function;

  constructor( props: iAXDataGridColumnFilterOptionProps ) {
    super( props );

    this.state = {
      mounted: false,
      scrollTop: 0,
      clientHeight: 0,
      scrollHeight: props.options.length * 20,
      optionItemHeight: 20
    };

    this.onScroll = this.onScroll.bind( this );
  }

  public componentDidMount() {
    const clientHeight = getInnerHeight( ReactDOM.findDOMNode( this.refs[ 'options-container' ] ) );

    this.setState( {
      mounted: true,
      clientHeight: clientHeight
    } );
  }

  private getOption() {
    const {
            options,
            onChange
          } = this.props;

    let sIndex: number = Math.floor( this.state.scrollTop / this.state.optionItemHeight );
    let eIndex: number = Math.floor( this.state.scrollTop / this.state.optionItemHeight ) + Math.ceil( this.state.clientHeight / this.state.optionItemHeight );
    if ( eIndex > options.length ) eIndex = options.length;

    const paddingTopNode = <div style={{ height: sIndex * this.state.optionItemHeight }} />;
    const paddingBottomNode = <div style={{ height: (options.length - eIndex) * this.state.optionItemHeight }} />;

    return <div>
      {paddingTopNode}
      {Range( sIndex, eIndex ).map(
        ( i ) => {
          const option = options[ i ];
          return <div
            key={i}
            data-option
            data-checked={option.checked}
            style={{ lineHeight: this.state.optionItemHeight + 'px' }}
            onClick={e => {
              onChange( option.value, !option.checked, option.checkAll );
            }}
          >
            <div className={classNames( 'axd-option-check-box' )} />
            <span className={classNames( 'axd-option-text' )}>{option.text}</span>
          </div>;
        }
      )}
      {paddingBottomNode}
    </div>
  }

  private onScroll( e ) {
    this.setState( {
      scrollTop: e.target.scrollTop
    } );
  }

  public render() {
    return <div data-options='' ref='options-container' onScroll={throttle( this.onScroll, 10 )}>
      {this.state.mounted ? this.getOption() : null}
    </div>
  }
}
