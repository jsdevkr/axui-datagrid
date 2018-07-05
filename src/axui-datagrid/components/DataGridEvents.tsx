import * as React from 'react';
import { EventNames, KeyCodes } from '../stores';
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
      setStoreState,
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

    setStoreState({
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

  onKeyAction = (keyAction: KeyCodes) => {
    const {
      filteredList = [],
      headerColGroup = [],
      scrollLeft = 0,
      scrollTop = 0,
      focusedRow = 0,
      focusedCol = 0,
      options = {},
      styles = {},
      setStoreState,
      colGroup = [],
    } = this.props;

    const {
      printStartColIndex = 0,
      printEndColIndex = colGroup.length,
    } = this.props;

    const { frozenRowIndex = 0 } = options;
    const {
      bodyTrHeight = 0,
      bodyHeight = 0,
      scrollContentWidth = 0,
      scrollContentHeight = 0,
      scrollContentContainerWidth = 0,
      scrollContentContainerHeight = 0,
      CTInnerWidth = 0,
      asidePanelWidth = 0,
      frozenPanelWidth = 0,
      rightPanelWidth = 0,
      verticalScrollerWidth = 0,
    } = styles;

    const sRowIndex = Math.floor(-scrollTop / bodyTrHeight) + frozenRowIndex;
    const eRowIndex =
      Math.floor(-scrollTop / bodyTrHeight) +
      frozenRowIndex +
      Math.floor(bodyHeight / bodyTrHeight);

    const sColIndex = printStartColIndex;
    const eColIndex = printEndColIndex;
    const pRowSize = Math.floor(bodyHeight / bodyTrHeight);

    const getAvailScrollTop = (rowIndex: number): number => {
      let _scrollTop: number | undefined = undefined;

      if (sRowIndex >= rowIndex) {
        _scrollTop = -rowIndex * bodyTrHeight;
      } else if (eRowIndex <= rowIndex) {
        _scrollTop =
          -rowIndex * bodyTrHeight + (pRowSize * bodyTrHeight - bodyTrHeight);
      }

      if (typeof _scrollTop !== 'undefined') {
        _scrollTop = getScrollPosition(scrollLeft, _scrollTop, {
          scrollWidth: scrollContentWidth,
          scrollHeight: scrollContentHeight,
          clientWidth: scrollContentContainerWidth,
          clientHeight: scrollContentContainerHeight,
        }).scrollTop;
      } else {
        _scrollTop = scrollTop;
      }

      return _scrollTop;
    };
    const getAvailScrollLeft = (colIndex: number): number => {
      let _scrollLeft: number | undefined = undefined;

      if (sColIndex >= colIndex) {
        _scrollLeft = -(headerColGroup[colIndex]._sx as number);
      } else if (eColIndex <= colIndex) {
        _scrollLeft =
          -(headerColGroup[colIndex]._ex as number) +
          (CTInnerWidth -
            asidePanelWidth -
            frozenPanelWidth -
            rightPanelWidth -
            verticalScrollerWidth);
      }

      if (typeof _scrollLeft !== 'undefined') {
        _scrollLeft = getScrollPosition(_scrollLeft as number, scrollTop, {
          scrollWidth: scrollContentWidth,
          scrollHeight: scrollContentHeight,
          clientWidth: scrollContentContainerWidth,
          clientHeight: scrollContentContainerHeight,
        }).scrollLeft;
      } else {
        _scrollLeft = scrollLeft;
      }

      return _scrollLeft;
    };

    const proc = {
      [KeyCodes.ESC]: () => {
        setStoreState({
          selectionRows: {
            [focusedRow]: true,
          },
          selectionCols: {
            [focusedCol]: true,
          },
        });
      },
      [KeyCodes.ENTER]: () => {},
      [KeyCodes.HOME]: () => {
        const focusRow = 0;

        setStoreState({
          scrollTop: getAvailScrollTop(focusRow),
          selectionRows: {
            [focusRow]: true,
          },
          focusedRow: focusRow,
        });
      },
      [KeyCodes.END]: () => {
        const focusRow = filteredList.length - 1;

        setStoreState({
          scrollTop: getAvailScrollTop(focusRow),
          selectionRows: {
            [focusRow]: true,
          },
          focusedRow: focusRow,
        });
      },
      [KeyCodes.PAGE_UP]: () => {
        const focusRow = focusedRow - pRowSize < 1 ? 0 : focusedRow - pRowSize;

        setStoreState({
          scrollTop: getAvailScrollTop(focusRow),
          selectionRows: {
            [focusRow]: true,
          },
          focusedRow: focusRow,
        });
      },
      [KeyCodes.PAGE_DOWN]: () => {
        let focusRow =
          focusedRow + pRowSize >= filteredList.length
            ? filteredList.length - 1
            : focusedRow + pRowSize;

        setStoreState({
          scrollTop: getAvailScrollTop(focusRow),
          selectionRows: {
            [focusRow]: true,
          },
          focusedRow: focusRow,
        });
      },
      [KeyCodes.UP_ARROW]: () => {
        let focusRow = focusedRow < 1 ? 0 : focusedRow - 1;

        setStoreState({
          scrollTop: getAvailScrollTop(focusRow),
          selectionRows: {
            [focusRow]: true,
          },
          focusedRow: focusRow,
        });
      },
      [KeyCodes.DOWN_ARROW]: () => {
        let focusRow =
          focusedRow + 1 >= filteredList.length
            ? filteredList.length - 1
            : focusedRow + 1;

        setStoreState({
          scrollTop: getAvailScrollTop(focusRow),
          selectionRows: {
            [focusRow]: true,
          },
          focusedRow: focusRow,
        });
      },
      [KeyCodes.LEFT_ARROW]: () => {
        let focusCol = focusedCol < 1 ? 0 : focusedCol - 1;
        setStoreState({
          scrollLeft: getAvailScrollLeft(focusCol),
          selectionCols: {
            [focusCol]: true,
          },
          focusedCol: focusCol,
        });
      },
      [KeyCodes.RIGHT_ARROW]: () => {
        let focusCol =
          focusedCol + 1 >= headerColGroup.length
            ? headerColGroup.length - 1
            : focusedCol + 1;

        setStoreState({
          scrollLeft: getAvailScrollLeft(focusCol),
          selectionCols: {
            [focusCol]: true,
          },
          focusedCol: focusCol,
        });
      },
    };

    proc[keyAction] && proc[keyAction]();
  };

  onKeyPress = (e: any) => {
    const {
      filteredList = [],
      getRootNode,
      getClipBoardNode,
      colGroup = [],
      headerColGroup = [],
      selectionRows = {},
      selectionCols = {},
      focusedCol = 0,
      setStoreState,
      isInlineEditing = false,
    } = this.props;
    const rootNode = getRootNode && getRootNode();
    const clipBoardNode = getClipBoardNode && getClipBoardNode();

    const metaProc = {
      [KeyCodes.C]: () => {
        e.preventDefault();
        e.stopPropagation();

        let copySuccess: boolean = false;
        let copiedString: string = '';

        for (let rk in selectionRows) {
          if (selectionRows[rk]) {
            const item = filteredList[rk];
            for (let ck in selectionCols) {
              if (selectionCols[ck]) {
                copiedString += (item[headerColGroup[ck].key] || '') + '\t';
              }
            }
            copiedString += '\n';
          }
        }

        if (clipBoardNode) {
          clipBoardNode.value = copiedString;
          clipBoardNode.select();
        }

        try {
          copySuccess = document.execCommand('copy');
        } catch (e) {}

        rootNode && rootNode.focus();

        return copySuccess;
      },
      [KeyCodes.A]: () => {
        e.preventDefault();
        e.stopPropagation();

        let state = {
          dragging: false,

          selectionRows: {},
          selectionCols: {},
          focusedRow: 0,
          focusedCol: focusedCol,
        };
        state.selectionRows = (() => {
          let rows = {};
          filteredList.forEach((item, i) => {
            rows[i] = true;
          });
          return rows;
        })();
        state.selectionCols = (() => {
          let cols = {};
          colGroup.forEach(col => {
            cols[col.colIndex || 0] = true;
          });
          return cols;
        })();
        state.focusedCol = 0;
        setStoreState(state);
      },
    };

    if (e.metaKey) {
      // console.log('meta', e.which);
      if (e.which in metaProc) {
        metaProc[e.which]();
      }
    } else {
      this.onKeyAction(e.which);

      if (!isInlineEditing) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };

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
          this.onKeyPress(e);
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
