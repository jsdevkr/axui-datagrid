import * as React from 'react';
import { IDataGridStore } from '../providers/StoreProvider';
import { connectStore } from '../hoc';
import {
  getMousePosition,
  getScrollPosition,
  arrayFromRange,
  throttle,
  getDataItem,
} from '../utils';
import { IDataGrid } from '../common/@types';
import { DataGridEnums } from '../common/@enums';
import DataGridBodyPanel from './DataGridBodyPanel';
import DataGridBodyBottomPanel from './DataGridBodyBottomPanel';
import DataGridBodyLoader from './DataGridBodyLoader';

interface IProps extends IDataGridStore {}

class DataGridBody extends React.Component<IProps> {
  bodyRef: React.RefObject<HTMLDivElement>;
  state = {};

  constructor(props: IProps) {
    super(props);

    this.bodyRef = React.createRef();
  }

  handleSetSelected = (rowIndex: number) => {
    const { dispatch, dataLength = 0 } = this.props;

    if (rowIndex < 0 || rowIndex > dataLength - 1) {
      return;
    }

    dispatch(DataGridEnums.DispatchTypes.SELECT, {
      rowIndex,
    });
  };

  handleClickLineNumber = (e: React.MouseEvent, rowIndex: number) => {
    const {
      colGroup = [],
      focusedRow = 0,
      dataLength = 0,
      setStoreState,
    } = this.props;

    if (rowIndex < 0 || rowIndex > dataLength - 1) {
      return;
    }

    const state = {
      dragging: false,
      selectionRows: {},
      selectionCols: (() => {
        const cols = {};
        colGroup.forEach((col: any) => {
          cols[col.colIndex || 0] = true;
        });
        return cols;
      })(),
      focusedRow: focusedRow,
      focusedCol: 0,
    };

    if (e.shiftKey) {
      state.selectionRows = (() => {
        const rows = {};
        arrayFromRange(
          Math.min(focusedRow, rowIndex),
          Math.max(focusedRow, rowIndex),
        ).forEach(i => {
          rows[i] = true;
        });
        return rows;
      })();
    } else {
      state.selectionRows = {
        [rowIndex]: true,
      };
      state.focusedRow = rowIndex;
    }

    setStoreState(state);
  };

  handleClickBody = (
    e: React.MouseEvent,
    rowIndex: number,
    colIndex: number,
  ) => {
    const {
      colGroup = [],
      dataLength = 0,
      setStoreState,
      selectionSCol = 0,
      selectionECol = 0,
      selectionSRow = 0,
      selectionERow = 0,
    } = this.props;

    if (colIndex === -1 && (rowIndex > -1 || rowIndex < dataLength)) {
      colIndex = 0;

      const selectionRows = { [rowIndex]: true };
      const selectionCols = {};
      colGroup.forEach(col => {
        selectionCols[col.colIndex || ''] = true;
      });

      setStoreState({
        focusedRow: rowIndex,
        focusedCol: colIndex,
        selectionRows,
        selectionCols,
      });
      return;
    }

    if (
      colIndex < 0 ||
      colIndex > colGroup.length - 1 ||
      rowIndex < 0 ||
      rowIndex > dataLength - 1
    ) {
      return;
    }

    if (
      colIndex >= selectionSCol &&
      colIndex <= selectionECol &&
      rowIndex >= selectionSRow &&
      rowIndex <= selectionERow
    ) {
      setStoreState({
        focusedRow: rowIndex,
        focusedCol: colIndex,
      });
      return;
    }

    // 셀렉션 저장정보 초기화
    setStoreState({
      selectionStartOffset: undefined,
      selectionEndOffset: undefined,
      selectionMinOffset: undefined,
      selectionMaxOffset: undefined,
      selectionRows: { [rowIndex]: true },
      selectionCols: { [colIndex]: true },
      focusedRow: rowIndex,
      focusedCol: colIndex,
    });
  };

  getRowIndex = (y: number, _scrollTop: number): number => {
    const {
      dataLength = 0,
      styles: {
        frozenPanelHeight = 0,
        headerHeight = 0,
        bodyTrHeight = 0,
      } = {},
    } = this.props;

    const i = Math.floor(
      (y -
        headerHeight -
        (y - headerHeight < frozenPanelHeight ? 0 : _scrollTop)) /
        bodyTrHeight,
    );
    return i >= dataLength || i < 0 ? -1 : i;
  };

  getColIndex = (x: number, _scrollLeft: number): number => {
    const {
      colGroup = [],
      styles: { asidePanelWidth = 0, frozenPanelWidth = 0 } = {},
    } = this.props;

    const p: number =
      x -
      asidePanelWidth -
      (x - asidePanelWidth < frozenPanelWidth ? 0 : _scrollLeft);

    let cl: number = colGroup.length;
    let i: number = -1;
    while (cl--) {
      const col = colGroup[cl] as any;
      if (col && (col._sx || 0) <= p && (col._ex || 0) >= p) {
        i = col.colIndex as number;
        break;
      }
    }
    return i;
  };

  onMouseDownBody = (e: React.MouseEvent<Element>) => {
    const {
      headerColGroup = [],
      scrollLeft = 0,
      scrollTop = 0,
      focusedRow = 0,
      focusedCol = 0,
      isInlineEditing,
      inlineEditingCell = {},
      styles = {},
      setStoreState,
      dispatch,
      rootNode,
      rootObject = {},
      loading,
      loadingData,
    } = this.props;

    if (loadingData || loading) {
      e.preventDefault();
      return;
    }

    if (e.target instanceof Node) {
      if (!e.currentTarget.contains(e.target)) {
        e.preventDefault();
        return;
      }
    }

    const {
      headerHeight = 0,
      bodyHeight = 0,
      elWidth = 0,
      bodyTrHeight = 0,
      asidePanelWidth = 0,
      scrollContentWidth = 0,
      scrollContentHeight = 0,
      scrollContentContainerWidth = 0,
      scrollContentContainerHeight = 0,
    } = styles;
    const scrollPanelRightMargin = 0; // 필요하면 verticalScrollerWidth 대입
    const startMousePosition = getMousePosition(e);
    const spanType = (e.target as any).getAttribute('data-span');

    const { x: leftPadding = 0, y: topPadding = 0 } =
      rootNode &&
      rootNode.current &&
      (rootNode.current.getBoundingClientRect() as any);

    const startScrollLeft = scrollLeft;
    const startScrollTop = scrollTop;
    const startX: number = startMousePosition.x - leftPadding;
    const startY: number = startMousePosition.y - topPadding;

    const procBodySelect = () => {
      if (selectStartedCol < 0) {
        return;
      }

      const onMouseMove = (ee: any): void => {
        ee.preventDefault();
        const currMousePosition = getMousePosition(ee);

        // 인터벌 무빙 함수 아래 구문에서 연속 스크롤이 필요하면 사용
        const setStateCall = (
          currState: IDataGrid.IStoreState,
          _moving?: IDataGrid.IMoving,
        ): void => {
          const {
            selectionEndOffset: currSelectionEndOffset = {},
            scrollLeft: currScrollLeft = 0,
            scrollTop: currScrollTop = 0,
          } = currState;
          const { x: selectionEndOffsetX = 0, y: selectionEndOffsetY = 0 } =
            currSelectionEndOffset;

          const selectEndedRow: number = this.getRowIndex(
            selectionEndOffsetY,
            currScrollTop,
          );
          let selectEndedCol: number = this.getColIndex(
            selectionEndOffsetX,
            currScrollLeft,
          );

          // 컬럼인덱스를 찾지 못했다면
          if (selectEndedCol === -1) {
            const p = selectionEndOffsetX - asidePanelWidth - scrollLeft;
            const lastCol: any =
              headerColGroup[headerColGroup.length - 1] || {};
            if (p < 0) {
              selectEndedCol = 0;
            } else if (typeof lastCol._ex !== 'undefined' && lastCol._ex <= p) {
              selectEndedCol = lastCol.colIndex || 0;
            } else {
              selectEndedCol = 0;
            }
          }

          const sRow: number = Math.min(selectStartedRow, selectEndedRow);
          const eRow: number = Math.max(selectStartedRow, selectEndedRow);
          const sCol: number = Math.min(selectStartedCol, selectEndedCol);
          const eCol: number = Math.max(selectStartedCol, selectEndedCol);

          if (sRow !== -1 && eRow !== -1 && sCol !== -1 && eCol !== -1) {
            currState.selectionRows = {};
            currState.selectionCols = {};
            for (let i = sRow; i < eRow + 1; i++) {
              currState.selectionRows[i] = true;
            }
            for (let i = sCol; i < eCol + 1; i++) {
              currState.selectionCols[i] = true;
            }
          } else {
            // console.log('get selection fail', sRow, eRow, sCol, eCol);
          }

          setStoreState(currState);

          dispatch(DataGridEnums.DispatchTypes.CHANGE_SELECTION, {
            sRow,
            eRow,
            sCol,
            eCol,
            focusedRow: selectStartedRow,
            focusedCol: selectStartedCol,
          });
        };

        const scrollMoving = (_moving: IDataGrid.IMoving): boolean => {
          const {
            scrollTop: propsScrollTop = 0,
            scrollLeft: propsScrollLeft = 0,
            selectionEndOffset: propsSelectionEndOffset,
          } = this.props;

          let _scrollTop: number = propsScrollTop;
          let _scrollLeft: number = propsScrollLeft;

          if (_moving.top) {
            _scrollTop = propsScrollTop + bodyTrHeight;
          } else if (_moving.bottom) {
            _scrollTop = propsScrollTop - bodyTrHeight;
          }
          if (_moving.left) {
            _scrollLeft = propsScrollLeft + 100;
          } else if (_moving.right) {
            _scrollLeft = propsScrollLeft - 100;
          }

          const {
            scrollLeft: newScrollLeft,
            scrollTop: newScrollTop,
            endOfScrollTop,
            endOfScrollLeft,
          } = getScrollPosition(_scrollLeft, _scrollTop, {
            scrollWidth: scrollContentWidth,
            scrollHeight: scrollContentHeight,
            clientWidth: scrollContentContainerWidth,
            clientHeight: scrollContentContainerHeight,
          });

          setStateCall(
            {
              scrollTop: newScrollTop,
              scrollLeft: newScrollLeft,
              selectionEndOffset: propsSelectionEndOffset,
            },
            _moving,
          );

          return !endOfScrollTop && !endOfScrollLeft;
        };

        const x1: number = startMousePosition.x - leftPadding;
        const y1: number = startMousePosition.y - topPadding;
        const x2: number = currMousePosition.x - leftPadding;
        const y2: number = currMousePosition.y - topPadding;

        const p1X: number = Math.min(x1, x2);
        const p2X: number = Math.max(x1, x2);
        const p1Y: number = Math.min(y1, y2);
        const p2Y: number = Math.max(y1, y2);

        const moving: IDataGrid.IMoving = {
          active: false,
          top: false,
          left: false,
          bottom: false,
          right: false,
        };

        if (p1Y < headerHeight) {
          moving.active = true;
          moving.top = true;
        } else if (p2Y > headerHeight + bodyHeight) {
          moving.active = true;
          moving.bottom = true;
        }
        if (p1X < asidePanelWidth) {
          moving.active = true;
          moving.left = true;
        } else if (p2X > elWidth - scrollPanelRightMargin) {
          moving.active = true;
          moving.right = true;
        }

        // moving.active 이면 타임 인터벌 시작
        if (rootObject.timer) {
          clearInterval(rootObject.timer);
        }
        if (moving.active) {
          rootObject.timer = setInterval(() => {
            if (!scrollMoving(moving)) {
              clearInterval(rootObject.timer);
            }
          }, 60);
        } else {
          setStateCall(
            {
              scrollTop: scrollTop,
              scrollLeft: scrollLeft,
              selectionStartOffset: {
                x: x1,
                y: y1,
              },
              selectionEndOffset: {
                x: x2,
                y: y2,
              },
              selectionMinOffset: {
                x: p1X,
                y: p1Y,
              },
              selectionMaxOffset: {
                x: p2X,
                y: p2Y,
              },
            },
            moving,
          );
        }
      };

      const offEvent = (ee: any) => {
        ee.preventDefault();

        if (rootObject.timer) {
          clearInterval(rootObject.timer);
        }
        setStoreState({
          selectionStartOffset: undefined,
          selectionEndOffset: undefined,
          selectionMinOffset: undefined,
          selectionMaxOffset: undefined,
        });
        document.removeEventListener('mousemove', throttledOnMouseMove);
        document.removeEventListener('mouseup', offEvent);
        // document.removeEventListener('mouseout', offEvent);
      };

      const throttledOnMouseMove = throttle(onMouseMove, 200);

      if (e.metaKey || (e.shiftKey && focusedRow > -1 && focusedCol > -1)) {
        if (e.shiftKey) {
          const state = {
            dragging: false,

            selectionRows: {},
            selectionCols: {},
          };

          const sRow: number = Math.min(focusedRow, selectStartedRow);
          const sCol: number = Math.min(focusedCol, selectStartedCol);
          const eRow: number = Math.max(focusedRow, selectStartedRow);
          const eCol: number = Math.max(focusedCol, selectStartedCol);
          for (let i = sRow; i < eRow + 1; i++) {
            state.selectionRows[i] = true;
          }
          for (let i = sCol; i < eCol + 1; i++) {
            state.selectionCols[i] = true;
          }

          setStoreState(state);

          dispatch(DataGridEnums.DispatchTypes.CHANGE_SELECTION, {
            sRow,
            eRow,
            sCol,
            eCol,
            focusedRow,
            focusedCol,
          });

          selectStartedRow = focusedRow;
          selectStartedCol = focusedCol;
        }
      } else {
        // 셀렉션 저장정보 초기화
        if (e.button === 0) {
          setStoreState({
            selectionStartOffset: undefined,
            selectionEndOffset: undefined,
            selectionMinOffset: undefined,
            selectionMaxOffset: undefined,
            selectionRows: { [selectStartedRow]: true },
            selectionCols: { [selectStartedCol]: true },
            focusedRow: selectStartedRow,
            focusedCol: selectStartedCol,
          });

          dispatch(DataGridEnums.DispatchTypes.CHANGE_SELECTION, {
            sRow: selectStartedRow,
            eRow: selectStartedRow,
            sCol: selectStartedCol,
            eCol: selectStartedCol,
            focusedRow: selectStartedRow,
            focusedCol: selectStartedCol,
          });
        }
      }

      document.addEventListener('mousemove', throttledOnMouseMove);
      document.addEventListener('mouseup', offEvent);
      // document.addEventListener('mouseout', offEvent);
    };

    // 선택이 시작된 row / col
    let selectStartedRow: number = this.getRowIndex(startY, startScrollTop);
    // row값이 없다면 선택 안되야 함.
    let selectStartedCol: number =
      selectStartedRow === -1 ? -1 : this.getColIndex(startX, startScrollLeft);

    if (
      isInlineEditing &&
      inlineEditingCell.rowIndex === selectStartedRow &&
      inlineEditingCell.colIndex === selectStartedCol
    ) {
      // 선택된 셀이 에디팅중인 셀이라면 함수 실행 중지
      return false;
    }

    // only first mouse button
    if (e.button === 0) {
      switch (spanType) {
        case 'lineNumber':
          this.handleClickLineNumber(e, selectStartedRow);
          break;
        case 'rowSelector':
          this.handleSetSelected(selectStartedRow);
          break;
        default:
          procBodySelect();
          break;
      }
    } else {
      this.handleClickBody(e, selectStartedRow, selectStartedCol);
    }

    return true;
  };

  onWheel = (e: WheelEvent) => {
    const {
      scrollLeft = 0,
      scrollTop = 0,
      styles = {},
      setStoreState,
    } = this.props;

    const {
      scrollContentWidth = 0,
      scrollContentContainerWidth = 0,
      scrollContentHeight = 0,
      scrollContentContainerHeight = 0,
    } = styles;

    const delta = { x: 0, y: 0 };

    if ((e as any).detail) {
      delta.y = (e as any).detail * 10;
    } else {
      if (typeof e.deltaY === 'undefined') {
        delta.y = -(e as any).wheelDelta;
        delta.x = 0;
      } else {
        delta.y = e.deltaY;
        delta.x = e.deltaX;
      }
    }

    const {
      scrollLeft: currScrollLeft = 0,
      scrollTop: currScrollTop = 0,
      endOfScrollTop,
    } = getScrollPosition(scrollLeft - delta.x, scrollTop - delta.y, {
      scrollWidth: scrollContentWidth,
      scrollHeight: scrollContentHeight,
      clientWidth: scrollContentContainerWidth,
      clientHeight: scrollContentContainerHeight,
    });

    if (scrollContentContainerHeight < scrollContentHeight && !endOfScrollTop) {
      e.preventDefault();
    }

    setStoreState({
      scrollLeft: currScrollLeft,
      scrollTop: currScrollTop,
    });

    return;
  };

  onClick = (e: React.MouseEvent) => {
    const {
      rootNode,
      scrollLeft = 0,
      scrollTop = 0,
      data = {},
      dataLength = 0,
      colGroup = [],
      onClick,
      loading,
      loadingData,
      isInlineEditing = false,
      inlineEditingCell,
      focusedCol = -1,
      selectionRows = {},
      selectionCols = {},
    } = this.props;

    if (
      Object.keys(selectionRows).length > 1 ||
      Object.keys(selectionCols).length > 1
    ) {
      e.preventDefault();
      return;
    }
    if (loadingData || loading) {
      e.preventDefault();
      return;
    }

    const startMousePosition = getMousePosition(e);
    const { x: leftPadding = 0, y: topPadding = 0 } =
      rootNode &&
      rootNode.current &&
      (rootNode.current.getBoundingClientRect() as any);
    const startX: number = startMousePosition.x - leftPadding;
    const startY: number = startMousePosition.y - topPadding;

    const rowIndex: number = this.getRowIndex(startY, scrollTop);
    // row값이 없다면 선택 안되야 함.
    const colIndex: number =
      rowIndex === -1 ? -1 : this.getColIndex(startX, scrollLeft);

    if (rowIndex < 0 || rowIndex > dataLength - 1) {
      return;
    }
    if (colIndex < 0 || colIndex > colGroup.length - 1) {
      return;
    }

    if (onClick) {
      const { key: itemKey = '' } = colGroup[colIndex];
      const item = getDataItem(data, rowIndex);
      if (!item) {
        return;
      }
      onClick({
        e,
        item,
        value: item.value[itemKey],
        rowIndex,
        colIndex,
      });
    }
  };

  onDoubleClick = (e: React.MouseEvent) => {
    const {
      rootNode,
      scrollLeft = 0,
      scrollTop = 0,
      data = {},
      dataLength = 0,
      colGroup = [],
      onDoubleClick,
      loading,
      loadingData,
      isInlineEditing = false,
      inlineEditingCell,
      focusedCol = -1,
    } = this.props;

    if (loadingData || loading) {
      e.preventDefault();
      return;
    }

    const startMousePosition = getMousePosition(e);
    const { x: leftPadding = 0, y: topPadding = 0 } =
      rootNode &&
      rootNode.current &&
      (rootNode.current.getBoundingClientRect() as any);
    const startX: number = startMousePosition.x - leftPadding;
    const startY: number = startMousePosition.y - topPadding;

    const rowIndex: number = this.getRowIndex(startY, scrollTop);
    // row값이 없다면 선택 안되야 함.
    const colIndex: number =
      rowIndex === -1 ? -1 : this.getColIndex(startX, scrollLeft);

    if (rowIndex < 0 || rowIndex > dataLength - 1) {
      return;
    }
    if (colIndex < 0 || colIndex > colGroup.length - 1) {
      return;
    }

    if (onDoubleClick) {
      const { key: itemKey = '' } = colGroup[colIndex];
      const item = getDataItem(data, rowIndex);
      if (!item) {
        return;
      }
      onDoubleClick({
        e,
        item,
        value: item.value[itemKey],
        rowIndex,
        colIndex,
      });
    }
  };

  shouldComponentUpdate(pProps: IProps) {
    const {
      scrollLeft = 0,
      scrollTop = 0,
      options: { frozenRowIndex = 0, bodyLoaderHeight = 0 } = {},
      styles: {
        elWidth = 0,
        bodyHeight = 0,
        bodyTrHeight = 1,
        asidePanelWidth = 0,
        frozenPanelWidth = 0,
        frozenPanelHeight = 0,
        rightPanelWidth = 0,
        footSumHeight = 0,
      } = {},
      loadingData = false,
      data = [],
      colGroup = [],
    } = this.props;

    const {
      scrollLeft: _scrollLeft = 0,
      scrollTop: _scrollTop = 0,
      options: {
        frozenRowIndex: _frozenRowIndex = 0,
        bodyLoaderHeight: _bodyLoaderHeight = 0,
      } = {},
      styles: {
        elWidth: _elWidth = 0,
        bodyHeight: _bodyHeight = 0,
        bodyTrHeight: _bodyTrHeight = 1,
        asidePanelWidth: _asidePanelWidth = 0,
        frozenPanelWidth: _frozenPanelWidth = 0,
        frozenPanelHeight: _frozenPanelHeight = 0,
        rightPanelWidth: _rightPanelWidth = 0,
        footSumHeight: _footSumHeight = 0,
      } = {},
      loadingData: _loadingData = false,
      data: _data = [],
      colGroup: _colGroup = [],
    } = pProps;

    if (data !== _data || colGroup !== _colGroup) {
      return true;
    }
    if (scrollTop !== _scrollTop || scrollLeft !== _scrollLeft) {
      return true;
    }

    if (
      frozenRowIndex !== _frozenRowIndex ||
      bodyLoaderHeight !== _bodyLoaderHeight ||
      elWidth !== _elWidth ||
      bodyHeight !== _bodyHeight ||
      bodyTrHeight !== _bodyTrHeight ||
      asidePanelWidth !== _asidePanelWidth ||
      frozenPanelWidth !== _frozenPanelWidth ||
      frozenPanelHeight !== _frozenPanelHeight ||
      rightPanelWidth !== _rightPanelWidth ||
      footSumHeight !== _footSumHeight ||
      loadingData !== _loadingData
    ) {
      return true;
    }

    return false;
  }

  componentDidMount() {
    if (this.bodyRef.current) {
      this.bodyRef.current.addEventListener('wheel', this.onWheel, {
        passive: false,
      });
    }
  }

  componentWillUnmount() {
    if (this.bodyRef.current) {
      this.bodyRef.current.removeEventListener('wheel', this.onWheel);
    }
  }

  render() {
    const {
      scrollLeft = 0,
      scrollTop = 0,
      options: { frozenRowIndex = 0, bodyLoaderHeight = 0 } = {},
      styles: {
        elWidth = 0,
        bodyHeight = 0,
        bodyTrHeight = 1,
        asidePanelWidth = 0,
        frozenPanelWidth = 0,
        frozenPanelHeight = 0,
        rightPanelWidth = 0,
        footSumHeight = 0,
      } = {},
      loadingData = false,
      dataLength = 0,
    } = this.props;

    const sRowIndex =
      Math.floor(-scrollTop / (bodyTrHeight || 1)) + frozenRowIndex;
    const loadingDataHeight = loadingData ? bodyLoaderHeight : 0;
    const scrollPanelRightMargin = 0; // 필요하면 verticalScrollerWidth 대입

    const topBodyScrollConfig: IDataGrid.IScrollConfig = {
      frozenRowIndex: 0,
      sRowIndex: 0,
      eRowIndex: frozenRowIndex - 1,
    };

    if ((topBodyScrollConfig.eRowIndex || 0) >= dataLength) {
      topBodyScrollConfig.eRowIndex = dataLength - 1;
    }

    const bodyScrollConfig: IDataGrid.IScrollConfig = {
      frozenRowIndex: frozenRowIndex,
      sRowIndex: sRowIndex,
      eRowIndex: sRowIndex + Math.ceil(bodyHeight / (bodyTrHeight || 1)),
    };

    if ((bodyScrollConfig.eRowIndex || 0) >= dataLength) {
      bodyScrollConfig.eRowIndex = dataLength - 1;
    }

    const topAsideBodyPanelStyle = {
      left: 0,
      width: asidePanelWidth,
      top: 0,
      height: frozenPanelHeight,
    };
    const topLeftBodyPanelStyle = {
      left: asidePanelWidth,
      width: frozenPanelWidth,
      top: 0,
      height: frozenPanelHeight,
    };
    const topBodyPanelStyle = {
      left: frozenPanelWidth + asidePanelWidth,
      width:
        elWidth -
        asidePanelWidth -
        frozenPanelWidth -
        rightPanelWidth -
        scrollPanelRightMargin,
      top: 0,
      height: frozenPanelHeight,
    };
    const asideBodyPanelStyle = {
      left: 0,
      width: asidePanelWidth,
      top: frozenPanelHeight - loadingDataHeight,
      height: bodyHeight - frozenPanelHeight - footSumHeight,
    };
    const leftBodyPanelStyle = {
      left: asidePanelWidth,
      width: frozenPanelWidth,
      top: frozenPanelHeight - loadingDataHeight,
      height: bodyHeight - frozenPanelHeight - footSumHeight,
    };

    const bodyPanelStyle = {
      left: frozenPanelWidth + asidePanelWidth,
      width:
        elWidth -
        asidePanelWidth -
        frozenPanelWidth -
        rightPanelWidth -
        scrollPanelRightMargin,
      top: frozenPanelHeight - loadingDataHeight,
      height: bodyHeight - frozenPanelHeight - footSumHeight,
    };
    const bottomAsideBodyPanelStyle = {
      left: 0,
      width: asidePanelWidth,
      top: bodyHeight - footSumHeight - 1,
      height: footSumHeight,
    };
    const bottomLeftBodyPanelStyle = {
      left: asidePanelWidth,
      width: frozenPanelWidth,
      top: bodyHeight - footSumHeight - 1,
      height: footSumHeight,
    };
    const bottomBodyPanelStyle = {
      left: frozenPanelWidth + asidePanelWidth,
      width:
        elWidth -
        asidePanelWidth -
        frozenPanelWidth -
        rightPanelWidth -
        scrollPanelRightMargin,
      top: bodyHeight - footSumHeight - 1,
      height: footSumHeight,
    };

    return (
      <div
        ref={this.bodyRef}
        className={'axui-datagrid-body'}
        style={{ height: bodyHeight, touchAction: 'none' }}
        onMouseDown={this.onMouseDownBody}
        onClick={this.onClick}
        onDoubleClick={this.onDoubleClick}
      >
        {asidePanelWidth !== 0 && frozenPanelHeight !== 0 && (
          <DataGridBodyPanel
            panelName={DataGridEnums.PanelNames.TOP_ASIDE_BODY_SCROLL}
            containerStyle={topAsideBodyPanelStyle}
            panelScrollConfig={topBodyScrollConfig}
          />
        )}
        {frozenPanelWidth !== 0 && frozenPanelHeight !== 0 && (
          <DataGridBodyPanel
            panelName={DataGridEnums.PanelNames.TOP_LEFT_BODY_SCROLL}
            containerStyle={topLeftBodyPanelStyle}
            panelScrollConfig={topBodyScrollConfig}
          />
        )}
        {frozenPanelHeight !== 0 && (
          <DataGridBodyPanel
            panelName={DataGridEnums.PanelNames.TOP_BODY_SCROLL}
            containerStyle={topBodyPanelStyle}
            panelScrollConfig={topBodyScrollConfig}
            panelLeft={scrollLeft}
          />
        )}
        {asidePanelWidth !== 0 && (
          <DataGridBodyPanel
            panelName={DataGridEnums.PanelNames.ASIDE_BODY_SCROLL}
            containerStyle={asideBodyPanelStyle}
            panelScrollConfig={bodyScrollConfig}
            panelTop={scrollTop}
          />
        )}
        {frozenPanelWidth !== 0 && (
          <DataGridBodyPanel
            panelName={DataGridEnums.PanelNames.LEFT_BODY_SCROLL}
            containerStyle={leftBodyPanelStyle}
            panelScrollConfig={bodyScrollConfig}
            panelTop={scrollTop}
          />
        )}
        <DataGridBodyPanel
          panelName={DataGridEnums.PanelNames.BODY_SCROLL}
          containerStyle={bodyPanelStyle}
          panelScrollConfig={bodyScrollConfig}
          panelLeft={scrollLeft}
          panelTop={scrollTop}
        />
        {footSumHeight !== 0 && asidePanelWidth !== 0 && (
          <DataGridBodyBottomPanel
            panelName={DataGridEnums.PanelNames.BOTTOM_ASIDE_BODY_SCROLL}
            containerStyle={bottomAsideBodyPanelStyle}
          />
        )}
        {footSumHeight !== 0 && frozenPanelHeight !== 0 && (
          <DataGridBodyBottomPanel
            panelName={DataGridEnums.PanelNames.BOTTOM_LEFT_BODY_SCROLL}
            containerStyle={bottomLeftBodyPanelStyle}
          />
        )}
        {footSumHeight !== 0 && (
          <DataGridBodyBottomPanel
            panelName={DataGridEnums.PanelNames.BOTTOM_BODY_SCROLL}
            containerStyle={bottomBodyPanelStyle}
            panelLeft={scrollLeft}
          />
        )}
        <DataGridBodyLoader
          loadingData={loadingData}
          bodyLoaderHeight={bodyLoaderHeight}
        />
      </div>
    );
  }
}

export default connectStore(DataGridBody);
