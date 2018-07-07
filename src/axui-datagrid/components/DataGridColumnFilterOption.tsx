import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { types } from '../stores';
import { connectStore } from '../hoc';
import { IDataGridStore } from '../providers';
import {
  classNames as CX,
  throttle,
  getInnerHeight,
  arrayFromRange,
} from '../utils';

interface IProps extends IDataGridStore {
  filterOptions: any[];
  optionItemHeight: number;
  onChange: (value: any, checked: any, checkAll: any) => void;
}
interface IState {
  mounted: boolean;
  scrollTop: number;
  clientHeight: number;
  scrollHeight: number;
}

class DatagridColumnFilterOption extends React.Component<IProps, IState> {
  state = {
    mounted: false,
    scrollTop: 0,
    clientHeight: 0,
    scrollHeight: 0,
  };

  throttledOnScroll: () => void;

  getOption() {
    const { filterOptions, optionItemHeight, onChange } = this.props;
    const { scrollTop, clientHeight } = this.state;
    let sIndex: number = Math.floor(scrollTop / optionItemHeight);
    let eIndex: number =
      Math.floor(scrollTop / optionItemHeight) +
      Math.ceil(clientHeight / optionItemHeight);
    if (eIndex > filterOptions.length) {
      eIndex = filterOptions.length;
    }

    const paddingTopNode = (
      <div style={{ height: sIndex * optionItemHeight }} />
    );
    const paddingBottomNode = (
      <div
        style={{
          height: (filterOptions.length - eIndex) * optionItemHeight,
        }}
      />
    );

    return (
      <div>
        {paddingTopNode}
        {arrayFromRange(sIndex, eIndex).map((i: number) => {
          const option = filterOptions[i];
          if (option) {
            return (
              <div
                key={i}
                data-option
                data-checked={option.checked}
                style={{ lineHeight: optionItemHeight + 'px' }}
                onClick={(e: any) => {
                  onChange(option.value, !option.checked, option.checkAll);
                }}
              >
                <div className="axui-datagrid-option-check-box" />
                <span className="axui-datagrid-option-text">{option.text}</span>
              </div>
            );
          }

          return;
        })}
        {paddingBottomNode}
      </div>
    );
  }

  onScroll = (e: any) => {
    this.setState({
      scrollTop: e.target.scrollTop,
    });
  };

  componentDidMount() {
    const { filterOptions, optionItemHeight } = this.props;

    this.setState({
      mounted: true,
      clientHeight: getInnerHeight(
        ReactDOM.findDOMNode(this.refs['options-container']),
      ),
      scrollHeight: filterOptions.length * optionItemHeight,
    });
  }

  render() {
    const { mounted } = this.state;
    return (
      <div
        data-options=""
        ref="options-container"
        onScroll={throttle(this.onScroll, 10)}
      >
        {mounted ? this.getOption() : null}
      </div>
    );
  }
}

export default connectStore(DatagridColumnFilterOption);
