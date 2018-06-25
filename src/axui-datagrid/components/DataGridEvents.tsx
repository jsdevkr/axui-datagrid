import * as React from 'react';
import { EventNames } from '../stores';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import { getScrollPosition } from '../utils';

interface IProps extends IDataGridStore {
  style?: any;
  onFireEvent: (eventName: EventNames, e: any) => void;
}
interface IState {}

class DataGridEvents extends React.Component<IProps, IState> {
  state = {};

  onWheel = (e: any) => {
    const {
      scrollLeft = 0,
      scrollTop = 0,
      styles = {},
      dispatch,
      isColumnFilter = false,
    } = this.props;

    const {
      scrollContentWidth = 0,
      scrollContentContainerWidth = 0,
      scrollContentHeight = 0,
      scrollContentContainerHeight = 0,
    } = styles;

    let delta = { x: 0, y: 0 };

    // 컬럼필터 활성화 상태라면 구문 실행 안함.
    if (isColumnFilter) {
      return true;
    }

    if (e.detail) {
      delta.y = e.detail * 10;
    } else {
      if (typeof e.deltaY === 'undefined') {
        delta.y = -e.wheelDelta;
        delta.x = 0;
      } else {
        delta.y = e.deltaY;
        delta.x = e.deltaX;
      }
    }

    let {
      scrollLeft: currScrollLeft = 0,
      scrollTop: currScrollTop = 0,
    } = getScrollPosition(scrollLeft - delta.x, scrollTop - delta.y, {
      scrollWidth: scrollContentWidth,
      scrollHeight: scrollContentHeight,
      clientWidth: scrollContentContainerWidth,
      clientHeight: scrollContentContainerHeight,
    });

    dispatch({
      scrollLeft: currScrollLeft,
      scrollTop: currScrollTop,
    });

    e.preventDefault();
    e.stopPropagation();

    /* 휠 이벤트에서 이벤트 중지 예외처리 사용안함.
    if (!endScroll) {

    }
    */

    return true;
  };

  onKeyAction = (e: any) => {};

  onKeyPress = (e: any) => {};

  render() {
    return (
      <div
        className={'axui-datagrid'}
        tabIndex={-1}
        style={this.props.style}
        onWheel={e => {
          this.onWheel(e);
        }}
        onKeyDown={e => {
          this.props.onFireEvent(EventNames.KEYDOWN, e);
        }}
        onKeyUp={e => {
          this.props.onFireEvent(EventNames.KEYUP, e);
        }}
        onMouseDown={e => {
          this.props.onFireEvent(EventNames.MOUSEDOWN, e);
        }}
        onMouseUp={e => {
          this.props.onFireEvent(EventNames.MOUSEUP, e);
        }}
        onClick={e => {
          this.props.onFireEvent(EventNames.CLICK, e);
        }}
        onTouchStartCapture={e => {
          this.props.onFireEvent(EventNames.TOUCHSTART, e);
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default connectStore(DataGridEvents);
