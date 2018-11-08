import * as React from 'react';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import { getScrollPosition, getNode } from '../utils';
import { KeyCodes, EventNames } from '../common/@enums';

interface IProps extends IDataGridStore {}
interface IState {}

class DataGridEvents extends React.Component<IProps, IState> {
  state = {};

  onWheel = (e: WheelEvent) => {
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

  onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const {
      colGroup = [],
      focusedRow = 0,
      focusedCol = 0,
      setStoreState,
      isInlineEditing,
    } = this.props;

    const proc = {
      [KeyCodes.ENTER]: () => {
        const col = colGroup[focusedCol];

        if (col.editor) {
          setStoreState({
            isInlineEditing: true,
            inlineEditingCell: {
              rowIndex: focusedRow,
              colIndex: col.colIndex,
              editor: col.editor,
            },
          });
        }
      },
    };

    if (!isInlineEditing && e.which in proc) {
      proc[e.which]();
    }
  };

  onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const {
      filteredList = [],
      rootNode,
      clipBoardNode,
      colGroup = [],
      headerColGroup = [],
      selectionRows = {},
      selectionCols = {},
      focusedCol = 0,
      setStoreState,
      scrollLeft = 0,
      scrollTop = 0,
      focusedRow = 0,
      options = {},
      styles = {},
    } = this.props;
    const {
      printStartColIndex = 0,
      printEndColIndex = colGroup.length,
    } = this.props;
    const { frozenRowIndex = 0, frozenColumnIndex = 0 } = options;
    const {
      bodyTrHeight = 0,
      scrollContentWidth = 0,
      scrollContentHeight = 0,
      scrollContentContainerWidth = 0,
      scrollContentContainerHeight = 0,
      frozenPanelWidth = 0,
      rightPanelWidth = 0,
      verticalScrollerWidth = 0,
    } = styles;
    const sRowIndex = Math.floor(-scrollTop / bodyTrHeight) + frozenRowIndex;
    const eRowIndex =
      Math.floor(-scrollTop / bodyTrHeight) +
      // frozenRowIndex +
      Math.floor(scrollContentContainerHeight / bodyTrHeight);

    const sColIndex = printStartColIndex;
    const eColIndex = printEndColIndex;
    const pRowSize = Math.floor(scrollContentContainerHeight / bodyTrHeight);

    const getAvailScrollTop = (rowIndex: number): number | undefined => {
      let _scrollTop: number | undefined = undefined;

      if (frozenRowIndex >= rowIndex) {
        return;
      }

      if (sRowIndex >= rowIndex) {
        _scrollTop = -(rowIndex - frozenRowIndex) * bodyTrHeight;
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
    const getAvailScrollLeft = (colIndex: number): number | undefined => {
      let _scrollLeft: number | undefined = undefined;

      if (frozenColumnIndex > colIndex) {
        return;
      }

      if (sColIndex >= colIndex - frozenColumnIndex) {
        _scrollLeft = -(colGroup[colIndex]._sx as number) + frozenPanelWidth;
      } else if (eColIndex <= colIndex - frozenColumnIndex) {
        // 끝점 계산
        _scrollLeft =
          scrollContentContainerWidth -
          (colGroup[colIndex]._ex as number) +
          frozenPanelWidth -
          verticalScrollerWidth -
          rightPanelWidth;
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

        if (clipBoardNode && clipBoardNode.current) {
          clipBoardNode.current.value = copiedString;
          clipBoardNode.current.select();
        }

        try {
          copySuccess = document.execCommand('copy');
        } catch (e) {}

        rootNode && rootNode.current && rootNode.current.focus();

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
      [KeyCodes.HOME]: () => {
        e.preventDefault();
        e.stopPropagation();

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
        e.preventDefault();
        e.stopPropagation();

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
        e.preventDefault();
        e.stopPropagation();

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
        e.preventDefault();
        e.stopPropagation();

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
        e.preventDefault();
        e.stopPropagation();

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
        e.preventDefault();
        e.stopPropagation();

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
        e.preventDefault();
        e.stopPropagation();

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
        e.preventDefault();
        e.stopPropagation();

        let focusCol =
          focusedCol + 1 >= colGroup.length
            ? colGroup.length - 1
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

    if (e.metaKey) {
      if (e.which in metaProc) {
        metaProc[e.which]();
      }
    } else {
      proc[e.which] && proc[e.which]();
    }
  };

  onFireEvent = (e: any) => {
    const { loading, loadingData, isInlineEditing = false } = this.props;
    const proc = {
      [EventNames.WHEEL]: () => {
        if (!loadingData) {
          this.onWheel(e as WheelEvent);
        } else {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      [EventNames.KEYDOWN]: () => {
        if (!loadingData && !isInlineEditing) {
          this.onKeyDown(e);
        }
      },
      [EventNames.KEYUP]: () => {
        if (!loadingData && !isInlineEditing) {
          this.onKeyUp(e);
        }
      },
    };

    if (e.type in proc && !loading) {
      if (this.props.onBeforeEvent && !loadingData) {
        this.props.onBeforeEvent(e, e.type);
      }

      proc[e.type]();

      if (this.props.onAfterEvent && !loadingData) {
        this.props.onAfterEvent(e, e.type);
      }
    }
  };

  render() {
    return <div>{this.props.children}</div>;
  }

  componentWillMount() {
    const { rootNode } = this.props;
    if (rootNode && rootNode.current) {
      rootNode.current.addEventListener('keydown', this.onFireEvent);
      rootNode.current.addEventListener('keyup', this.onFireEvent);
      rootNode.current.addEventListener('wheel', this.onFireEvent);
    }
  }

  componentWillUnmount() {
    const { rootNode } = this.props;
    if (rootNode && rootNode.current) {
      rootNode.current.removeEventListener('keydown', this.onFireEvent);
      rootNode.current.removeEventListener('keyup', this.onFireEvent);
      rootNode.current.addEventListener('wheel', this.onFireEvent);
    }
  }
}

export default connectStore(DataGridEvents);
