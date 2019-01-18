import * as React from 'react';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import {
  getMousePosition,
  getScrollPosition,
  arrayFromRange,
  throttle,
  getNode,
} from '../utils';
import DataGridBodyPanel from './DataGridBodyPanel';
import DataGridBodyBottomPanel from './DataGridBodyBottomPanel';
import DataGridBodyLoader from './DataGridBodyLoader';
import { IDataGrid } from '../common/@types';
import { DataGridEnums } from '../common/@enums';

interface IProps extends IDataGridStore {}

class DataGridBody extends React.Component<IProps> {
  state = {};

  onMouseDownBody = (e: React.MouseEvent<Element>) => {
    const {
      filteredList = [],
      colGroup = [],
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

    if (loading || loadingData) {
      return false;
    }

    const {
      frozenPanelWidth = 0,
      frozenPanelHeight = 0,
      headerHeight = 0,
      bodyHeight = 0,
      CTInnerWidth = 0,
      verticalScrollerWidth = 0,
      bodyTrHeight = 0,
      asidePanelWidth = 0,
      scrollContentWidth = 0,
      scrollContentHeight = 0,
      scrollContentContainerWidth = 0,
      scrollContentContainerHeight = 0,
    } = styles;

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
    const getRowIndex: Function = (y: number, _scrollTop: number): number => {
      const i = Math.floor(
        (y -
          headerHeight -
          (y - headerHeight < frozenPanelHeight ? 0 : _scrollTop)) /
          bodyTrHeight,
      );
      return i < 0
        ? 0
        : i >= filteredList.length - 1
        ? filteredList.length - 1
        : i;
    };
    const getColIndex: Function = (x: number, _scrollLeft: number): number => {
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
    const procBodySelect = () => {
      if (selectStartedCol < 0) {
        return;
      }

      const onMouseMove = (ee: any): void => {
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
          const {
            x: selectionEndOffsetX = 0,
            y: selectionEndOffsetY = 0,
          } = currSelectionEndOffset;

          const selectEndedRow: number = getRowIndex(
            selectionEndOffsetY,
            currScrollTop,
          );
          let selectEndedCol: number = getColIndex(
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

          let sRow: number = Math.min(selectStartedRow, selectEndedRow);
          let eRow: number = Math.max(selectStartedRow, selectEndedRow);
          let sCol: number = Math.min(selectStartedCol, selectEndedCol);
          let eCol: number = Math.max(selectStartedCol, selectEndedCol);

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

        let x1: number = startMousePosition.x - leftPadding;
        let y1: number = startMousePosition.y - topPadding;
        let x2: number = currMousePosition.x - leftPadding;
        let y2: number = currMousePosition.y - topPadding;

        let p1X: number = Math.min(x1, x2);
        let p2X: number = Math.max(x1, x2);
        let p1Y: number = Math.min(y1, y2);
        let p2Y: number = Math.max(y1, y2);

        let moving: IDataGrid.IMoving = {
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
        } else if (p2X > CTInnerWidth - verticalScrollerWidth) {
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
              // clearInterval(this.scrollMovingTimer);
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
        document.removeEventListener('mouseleave', offEvent);
      };

      const throttledOnMouseMove = throttle(onMouseMove, 10);

      if (e.metaKey || (e.shiftKey && focusedRow > -1 && focusedCol > -1)) {
        if (e.shiftKey) {
          let state = {
            dragging: false,

            selectionRows: {},
            selectionCols: {},
          };

          let sRow: number = Math.min(focusedRow, selectStartedRow);
          let sCol: number = Math.min(focusedCol, selectStartedCol);
          let eRow: number = Math.max(focusedRow, selectStartedRow);
          let eCol: number = Math.max(focusedCol, selectStartedCol);
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
          });

          selectStartedRow = focusedRow;
          selectStartedCol = focusedCol;

          document.addEventListener('mousemove', throttledOnMouseMove);
          document.addEventListener('mouseup', offEvent);
          document.addEventListener('mouseleave', offEvent);
        }
      } else {
        // 셀렉션 저장정보 초기화
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
        });

        document.addEventListener('mousemove', throttledOnMouseMove);
        document.addEventListener('mouseup', offEvent);
        document.addEventListener('mouseleave', offEvent);
      }
    };
    const procClickLineNumber = () => {
      let state = {
        dragging: false,
        selectionRows: {},
        selectionCols: (() => {
          let cols = {};
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
          let rows = {};
          arrayFromRange(
            Math.min(focusedRow, selectStartedRow),
            Math.max(focusedRow, selectStartedRow) + 1,
          ).forEach(i => {
            rows[i] = true;
          });
          return rows;
        })();
      } else {
        state.selectionRows = {
          [selectStartedRow]: true,
        };
        state.focusedRow = selectStartedRow;
      }

      setStoreState(state);
    };
    const procClickRowSelector = () => {
      dispatch(DataGridEnums.DispatchTypes.SELECT, {
        rowIndex: selectStartedRow,
      });
    };
    const procBodyClick = () => {
      if (selectStartedCol < 0) {
        return;
      }
      // 셀렉션 저장정보 초기화
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
    };

    // 선택이 시작된 row / col
    let selectStartedRow: number = getRowIndex(startY, startScrollTop);
    let selectStartedCol: number = getColIndex(startX, startScrollLeft);

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
          procClickLineNumber();
          break;
        case 'rowSelector':
          procClickRowSelector();
          break;
        default:
          procBodySelect();
          break;
      }
    } else {
      procBodyClick();
    }

    return true;
  };

  render() {
    const {
      scrollLeft = 0,
      scrollTop = 0,
      options = {},
      styles = {},
      loadingData = false,
    } = this.props;
    const { frozenRowIndex = 0, bodyLoaderHeight = 0 } = options;
    const {
      CTInnerWidth = 0,
      bodyHeight = 0,
      bodyTrHeight = 1,
      asidePanelWidth = 0,
      frozenPanelWidth = 0,
      frozenPanelHeight = 0,
      rightPanelWidth = 0,
      verticalScrollerWidth = 0,
      footSumHeight = 0,
    } = styles;

    const sRowIndex =
      Math.floor(-scrollTop / (bodyTrHeight || 1)) + frozenRowIndex;
    const loadingDataHeight = loadingData ? bodyLoaderHeight : 0;

    const topBodyScrollConfig = {
      frozenRowIndex: 0,
      sRowIndex: 0,
      eRowIndex: frozenRowIndex - 1,
    };
    const bodyScrollConfig = {
      frozenRowIndex: frozenRowIndex,
      sRowIndex: sRowIndex,
      eRowIndex: sRowIndex + Math.ceil(bodyHeight / (bodyTrHeight || 1)) + 1,
    };

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
        CTInnerWidth -
        asidePanelWidth -
        frozenPanelWidth -
        rightPanelWidth -
        verticalScrollerWidth,
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
        CTInnerWidth -
        asidePanelWidth -
        frozenPanelWidth -
        rightPanelWidth -
        verticalScrollerWidth,
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
        CTInnerWidth -
        asidePanelWidth -
        frozenPanelWidth -
        rightPanelWidth -
        verticalScrollerWidth,
      top: bodyHeight - footSumHeight - 1,
      height: footSumHeight,
    };

    return (
      <div
        className={'axui-datagrid-body'}
        style={{ height: styles.bodyHeight }}
        onMouseDown={this.onMouseDownBody}
      >
        <DataGridBodyPanel
          panelName="top-aside-body-scroll"
          containerStyle={topAsideBodyPanelStyle}
          panelScrollConfig={topBodyScrollConfig}
        />
        <DataGridBodyPanel
          panelName="top-left-body-scroll"
          containerStyle={topLeftBodyPanelStyle}
          panelScrollConfig={topBodyScrollConfig}
        />
        <DataGridBodyPanel
          panelName="top-body-scroll"
          containerStyle={topBodyPanelStyle}
          panelScrollConfig={topBodyScrollConfig}
          panelLeft={scrollLeft}
        />
        <DataGridBodyPanel
          panelName="aside-body-scroll"
          containerStyle={asideBodyPanelStyle}
          panelScrollConfig={bodyScrollConfig}
          panelTop={scrollTop}
        />
        <DataGridBodyPanel
          panelName="left-body-scroll"
          containerStyle={leftBodyPanelStyle}
          panelScrollConfig={bodyScrollConfig}
          panelTop={scrollTop}
        />
        <DataGridBodyPanel
          panelName="body-scroll"
          containerStyle={bodyPanelStyle}
          panelScrollConfig={bodyScrollConfig}
          panelLeft={scrollLeft}
          panelTop={scrollTop}
        />
        <DataGridBodyBottomPanel
          panelName="bottom-aside-body-scroll"
          containerStyle={bottomAsideBodyPanelStyle}
        />
        <DataGridBodyBottomPanel
          panelName="bottom-left-body-scroll"
          containerStyle={bottomLeftBodyPanelStyle}
        />
        <DataGridBodyBottomPanel
          panelName="bottom-body-scroll"
          containerStyle={bottomBodyPanelStyle}
          panelLeft={scrollLeft}
        />
        <DataGridBodyLoader
          loadingData={loadingData}
          bodyLoaderHeight={bodyLoaderHeight}
        />
      </div>
    );
  }
}

export default connectStore(DataGridBody);
