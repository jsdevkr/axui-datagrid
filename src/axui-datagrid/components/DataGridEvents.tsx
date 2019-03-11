import * as React from 'react';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import { getScrollPosition } from '../utils';
import { DataGridEnums } from '../common/@enums';

interface IProps extends IDataGridStore {}
interface IState {}

class DataGridEvents extends React.Component<IProps, IState> {
  busy: boolean = false;
  state = {};

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

    let delta = { x: 0, y: 0 };

    if (e.detail) {
      delta.y = e.detail * 10;
    } else {
      if (typeof e.deltaY === 'undefined') {
        delta.y = -(e as any).wheelDelta;
        delta.x = 0;
      } else {
        delta.y = e.deltaY;
        delta.x = e.deltaX;
      }
    }

    let {
      scrollLeft: currScrollLeft = 0,
      scrollTop: currScrollTop = 0,
      endOfScrollTop,
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

    if (scrollContentContainerHeight < scrollContentHeight && !endOfScrollTop) {
      e.preventDefault();
      // e.stopPropagation();
    }

    return true;
  };

  onKeyUp = (e: React.KeyboardEvent<any>) => {
    const {
      colGroup = [],
      focusedRow = 0,
      focusedCol = 0,
      setStoreState,
    } = this.props;

    switch (e.which) {
      case DataGridEnums.KeyCodes.ENTER:
        const col = colGroup[focusedCol];
        if (!col.editor) {
          return;
        }
        setStoreState({
          isInlineEditing: true,
          inlineEditingCell: {
            rowIndex: focusedRow,
            colIndex: col.colIndex,
            editor: col.editor,
          },
        });
        return;
      default:
        return;
    }
  };

  onKeyDown = (e: React.KeyboardEvent<any>) => {
    return new Promise((resolve, reject) => {
      const {
        data = [],
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
        printEndColIndex = colGroup.length - 1,
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

      if (e.metaKey) {
        switch (e.which) {
          case DataGridEnums.MetaKeycodes.C:
            e.preventDefault();

            let copySuccess: boolean = false;
            let copiedString: string = '';

            for (let rk in selectionRows) {
              if (selectionRows[rk]) {
                const item = data[rk];
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

            if (copySuccess) {
              resolve();
            } else {
              reject();
            }

            break;

          case DataGridEnums.MetaKeycodes.A:
            e.preventDefault();

            let state = {
              dragging: false,

              selectionRows: {},
              selectionCols: {},
              focusedRow: 0,
              focusedCol: focusedCol,
            };
            state.selectionRows = (() => {
              let rows = {};
              data.forEach((item, i) => {
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
            setStoreState(state, () => {
              resolve();
            });

            break;
          default:
            resolve();
            break;
        }
      } else {
        let focusRow: number;
        let focusCol: number;

        switch (e.which) {
          case DataGridEnums.KeyCodes.ESC:
            setStoreState(
              {
                selectionRows: {
                  [focusedRow]: true,
                },
                selectionCols: {
                  [focusedCol]: true,
                },
              },
              () => {
                resolve();
              },
            );
            break;
          case DataGridEnums.KeyCodes.HOME:
            focusRow = 0;

            setStoreState(
              {
                scrollTop: getAvailScrollTop(focusRow),
                selectionRows: {
                  [focusRow]: true,
                },
                focusedRow: focusRow,
              },
              () => {
                resolve();
              },
            );

            break;
          case DataGridEnums.KeyCodes.END:
            focusRow = data.length - 1;

            setStoreState(
              {
                scrollTop: getAvailScrollTop(focusRow),
                selectionRows: {
                  [focusRow]: true,
                },
                focusedRow: focusRow,
              },
              () => {
                resolve();
              },
            );

            break;

          case DataGridEnums.KeyCodes.PAGE_UP:
            e.preventDefault();

            focusRow = focusedRow - pRowSize < 1 ? 0 : focusedRow - pRowSize;

            setStoreState(
              {
                scrollTop: getAvailScrollTop(focusRow),
                selectionRows: {
                  [focusRow]: true,
                },
                focusedRow: focusRow,
              },
              () => {
                resolve();
              },
            );

            break;
          case DataGridEnums.KeyCodes.PAGE_DOWN:
            e.preventDefault();

            focusRow =
              focusedRow + pRowSize >= data.length
                ? data.length - 1
                : focusedRow + pRowSize;

            setStoreState(
              {
                scrollTop: getAvailScrollTop(focusRow),
                selectionRows: {
                  [focusRow]: true,
                },
                focusedRow: focusRow,
              },
              () => {
                resolve();
              },
            );

            break;
          case DataGridEnums.KeyCodes.UP_ARROW:
            e.preventDefault();

            focusRow = focusedRow < 1 ? 0 : focusedRow - 1;

            setStoreState(
              {
                scrollTop: getAvailScrollTop(focusRow),
                selectionRows: {
                  [focusRow]: true,
                },
                focusedRow: focusRow,
              },
              () => {
                setTimeout(() => {
                  resolve();
                });
              },
            );

            break;
          case DataGridEnums.KeyCodes.DOWN_ARROW:
            e.preventDefault();

            focusRow =
              focusedRow + 1 >= data.length ? data.length - 1 : focusedRow + 1;

            setStoreState(
              {
                scrollTop: getAvailScrollTop(focusRow),
                selectionRows: {
                  [focusRow]: true,
                },
                focusedRow: focusRow,
              },
              () => {
                setTimeout(() => {
                  resolve();
                });
              },
            );

            break;
          case DataGridEnums.KeyCodes.LEFT_ARROW:
            e.preventDefault();

            focusCol = focusedCol < 1 ? 0 : focusedCol - 1;

            setStoreState(
              {
                scrollLeft: getAvailScrollLeft(focusCol),
                selectionCols: {
                  [focusCol]: true,
                },
                focusedCol: focusCol,
              },
              () => {
                setTimeout(() => {
                  resolve();
                });
              },
            );

            break;
          case DataGridEnums.KeyCodes.RIGHT_ARROW:
            e.preventDefault();

            focusCol =
              focusedCol + 1 >= colGroup.length
                ? colGroup.length - 1
                : focusedCol + 1;

            setStoreState(
              {
                scrollLeft: getAvailScrollLeft(focusCol),
                selectionCols: {
                  [focusCol]: true,
                },
                focusedCol: focusCol,
              },
              () => {
                setTimeout(() => {
                  resolve();
                });
              },
            );

            break;
          default:
            resolve();
            break;
        }
      }
    });
  };

  onContextmenu = (e: React.MouseEvent<any>) => {
    const { onRightClick, focusedRow, focusedCol, data, colGroup } = this.props;

    if (
      onRightClick &&
      data &&
      typeof focusedRow !== 'undefined' &&
      typeof focusedCol !== 'undefined' &&
      colGroup
    ) {
      const { key: itemKey = '' } = colGroup[focusedCol];

      onRightClick({
        e,
        item: data[focusedRow],
        value: data[focusedRow][itemKey],
        focusedRow,
        focusedCol,
      });
    }
  };

  onFireEvent = async (e: any) => {
    const { loading, loadingData, isInlineEditing = false } = this.props;

    if (this.busy || loadingData || loading) {
      e.preventDefault();
      return;
    }

    if (isInlineEditing) {
      return;
    }

    if (this.props.onBeforeEvent) {
      this.props.onBeforeEvent({ e, eventName: e.type });
    }

    switch (e.type) {
      case DataGridEnums.EventNames.WHEEL:
        this.onWheel(e as WheelEvent);
        break;
      case DataGridEnums.EventNames.KEYDOWN:
        this.busy = true;
        try {
          await this.onKeyDown(e);
        } catch (err) {
          console.log(err);
        }
        this.busy = false;
        break;
      case DataGridEnums.EventNames.KEYUP:
        this.onKeyUp(e);
        break;
      case DataGridEnums.EventNames.CONTEXTMENU:
        this.onContextmenu(e);
        break;
      default:
        break;
    }
  };

  render() {
    return <div onWheel={this.onFireEvent}>{this.props.children}</div>;
  }

  componentDidMount() {
    const { rootNode } = this.props;
    if (rootNode && rootNode.current) {
      rootNode.current.addEventListener('keydown', this.onFireEvent, false);
      rootNode.current.addEventListener('keyup', this.onFireEvent, false);
      rootNode.current.addEventListener('contextmenu', this.onFireEvent, false);
    }
  }

  componentWillUnmount() {
    const { rootNode } = this.props;
    if (rootNode && rootNode.current) {
      rootNode.current.removeEventListener('keydown', this.onFireEvent);
      // rootNode.current.removeEventListener('keyup', this.onFireEvent);
      rootNode.current.removeEventListener('contextmenu', this.onFireEvent);
    }
  }
}

export default connectStore(DataGridEvents);
