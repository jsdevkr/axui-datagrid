import * as React from 'react';
import { IDataGridStore } from '../providers/StoreProvider';
import { connectStore } from '../hoc';
import { isFunction, getDataItem } from '../utils';
import { DataGridEnums } from '../common/@enums';
import { IDataGrid } from '../common/@types';
import getAvailScrollTop from '../utils/getAvailScrollTop';
import getAvailScrollLeft from '../utils/getAvailScrollLeft';

interface IProps extends IDataGridStore {}
interface IState {}

class DataGridEvents extends React.Component<IProps, IState> {
  busy: boolean = false;
  state = {};

  // onKeyUp = (e: React.KeyboardEvent<any>) => {
  //   const {
  //     colGroup = [],
  //     focusedRow = 0,
  //     focusedCol = 0,
  //     setStoreState,
  //   } = this.props;

  //   switch (e.which) {
  //     case DataGridEnums.KeyCodes.ENTER:
  //       const col = colGroup[focusedCol];
  //       if (!col.editor) {
  //         return;
  //       }
  //       setStoreState({
  //         isInlineEditing: true,
  //         inlineEditingCell: {
  //           rowIndex: focusedRow,
  //           colIndex: col.colIndex,
  //           editor: col.editor,
  //         },
  //       });
  //       return;
  //     default:
  //       return;
  //   }
  // };

  handleKeyDown = (e: KeyboardEvent) => {
    return new Promise((resolve, reject) => {
      const {
        data = {},
        dataLength = 0,
        rootNode,
        clipBoardNode,
        colGroup = [],
        headerColGroup = [],
        selectionRows = {},
        selectionCols = {},
        setStoreState,
        scrollTop = 0,
        scrollLeft = 0,
        focusedRow = 0,
        focusedCol = 0,
        options = {},
        styles = {},
        predefinedFormatter = {},
        isInlineEditing,
        inlineEditingCell,
      } = this.props;
      const {
        printStartColIndex = 0,
        printEndColIndex = colGroup.length - 1,
      } = this.props;
      const {
        frozenRowIndex = 0,
        frozenColumnIndex = 0,
        disableClipboard = false,
      } = options;
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

      const getScrollLeftOptions = {
        colGroup,
        sColIndex,
        eColIndex,
        frozenColumnIndex,
        frozenPanelWidth,
        verticalScrollerWidth,
        rightPanelWidth,
        scrollContentWidth,
        scrollContentHeight,
        scrollContentContainerWidth,
        scrollContentContainerHeight,
        scrollTop,
        scrollLeft,
      };
      const getScrollTopOptions = {
        frozenRowIndex,
        sRowIndex,
        eRowIndex,
        scrollTop,
        scrollLeft,
        scrollContentWidth,
        scrollContentHeight,
        scrollContentContainerWidth,
        scrollContentContainerHeight,
        bodyTrHeight,
        pRowSize,
      };

      if (e.metaKey || e.ctrlKey) {
        switch (e.which) {
          case DataGridEnums.MetaKeycodes.C:
            if (!disableClipboard) {
              e.preventDefault();

              let copySuccess: boolean = false;
              const copiedString: string[] = [];

              for (const rk in selectionRows) {
                if (selectionRows[rk]) {
                  const item = getDataItem(data, Number(rk));
                  const copiedRow: string[] = [];
                  if (item) {
                    for (const ck in selectionCols) {
                      if (selectionCols[ck]) {
                        let val = '';
                        const { formatter, key: colKey = '' } = headerColGroup[
                          ck
                        ];
                        const formatterData = {
                          item,
                          index: Number(rk),
                          key: colKey,
                          value: item.value[colKey],
                        };

                        if (
                          typeof formatter === 'string' &&
                          formatter in predefinedFormatter
                        ) {
                          val = predefinedFormatter[formatter](formatterData);
                        } else if (isFunction(formatter)) {
                          val = (formatter as IDataGrid.formatterFunction)(
                            formatterData,
                          );
                        } else {
                          val = item.value[headerColGroup[ck].key];
                        }

                        copiedRow.push(val || '');
                      }
                    }
                  }
                  copiedString.push(copiedRow.join('\t'));
                }
              }

              if (clipBoardNode && clipBoardNode.current) {
                clipBoardNode.current.value = copiedString.join('\n');
                clipBoardNode.current.select();
              }

              try {
                copySuccess = document.execCommand('copy');
              } catch (e) {}

              rootNode && rootNode.current && rootNode.current.focus();

              if (copySuccess) {
                resolve();
              } else {
                reject('not working execCommand');
              }
            } else {
              reject('disableClipboard');
            }

            break;

          case DataGridEnums.MetaKeycodes.A:
            e.preventDefault();

            const state = {
              dragging: false,
              selectionRows: {},
              selectionCols: {},
              selectionSCol: 0,
              selectionECol: 0,
              selectionSRow: 0,
              selectionERow: dataLength,
              // focusedRow: 0,
              // focusedCol: 0,
            };
            Array.from(new Array(dataLength), (x, i) => {
              state.selectionRows[i] = true;
            });

            Object.values(colGroup).forEach(col => {
              state.selectionCols[col.colIndex || 0] = true;
              state.selectionECol = col.colIndex || 0;
            });

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
                scrollTop: getAvailScrollTop(focusRow, getScrollTopOptions),
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
            focusRow = dataLength - 1;

            setStoreState(
              {
                scrollTop: getAvailScrollTop(focusRow, getScrollTopOptions),
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
                scrollTop: getAvailScrollTop(focusRow, getScrollTopOptions),
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
              focusedRow + pRowSize >= dataLength
                ? dataLength - 1
                : focusedRow + pRowSize;

            setStoreState(
              {
                scrollTop: getAvailScrollTop(focusRow, getScrollTopOptions),
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
                scrollTop: getAvailScrollTop(focusRow, getScrollTopOptions),
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
              focusedRow + 1 >= dataLength ? dataLength - 1 : focusedRow + 1;

            setStoreState(
              {
                scrollTop: getAvailScrollTop(focusRow, getScrollTopOptions),
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
                scrollLeft: getAvailScrollLeft(focusCol, getScrollLeftOptions),
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
                scrollLeft: getAvailScrollLeft(focusCol, getScrollLeftOptions),
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

          case DataGridEnums.KeyCodes.ENTER:
            const col = colGroup[focusedCol];
            if (!col.editor) {
              resolve();
              break;
            }
            setStoreState(
              {
                isInlineEditing: true,
                inlineEditingCell: {
                  rowIndex: focusedRow,
                  colIndex: col.colIndex,
                  editor: col.editor,
                },
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

  onContextmenu = (e: MouseEvent) => {
    const {
      onRightClick,
      focusedRow,
      focusedCol,
      data,
      colGroup,
      loading,
      loadingData,
    } = this.props;

    if (this.busy || loadingData || loading) {
      e.preventDefault();
      return;
    }

    if (
      onRightClick &&
      data &&
      typeof focusedRow !== 'undefined' &&
      typeof focusedCol !== 'undefined' &&
      colGroup
    ) {
      if (!colGroup[focusedCol]) {
        return;
      }
      const { key: itemKey = '' } = colGroup[focusedCol];
      const item = getDataItem(data, focusedRow);
      if (!item) {
        return;
      }

      onRightClick({
        e,
        item,
        value: item.value[itemKey],
        focusedRow,
        focusedCol,
      });
    }
  };

  onKeyDownInlineEditor = (e: KeyboardEvent) => {
    const {
      data = {},
      inlineEditingCell,
      colGroup = [],
      printStartColIndex: sColIndex = 0,
      printEndColIndex: eColIndex = 0,
      scrollTop = 0,
      scrollLeft = 0,
      focusedCol = -1,
      focusedRow: rowIndex = 0,
      options: { frozenColumnIndex = 0 } = {},
      styles: {
        scrollContentWidth = 0,
        scrollContentHeight = 0,
        scrollContentContainerWidth = 0,
        scrollContentContainerHeight = 0,
        frozenPanelWidth = 0,
        rightPanelWidth = 0,
        verticalScrollerWidth = 0,
      } = {},
      dispatch,
      setStoreState,
    } = this.props;

    const { colIndex = 0, editor: colEditor } = colGroup[focusedCol];
    const editor: IDataGrid.IColEditor =
      colEditor === 'text'
        ? { type: 'text' }
        : (colEditor as IDataGrid.IColEditor);

    if (editor.type === 'checkbox') {
      // console.log('catch in onKeyDownInlineEditor', inlineEditingCell);

      switch (e.which) {
        case DataGridEnums.KeyCodes.TAB:
          e.preventDefault();

          const getScrollLeftOptions = {
            colGroup,
            sColIndex,
            eColIndex,
            frozenColumnIndex,
            frozenPanelWidth,
            verticalScrollerWidth,
            rightPanelWidth,
            scrollContentWidth,
            scrollContentHeight,
            scrollContentContainerWidth,
            scrollContentContainerHeight,
            scrollTop,
            scrollLeft,
          };

          const nextCol =
            colGroup[
              e && e.shiftKey
                ? colIndex - 1 > -1
                  ? colIndex - 1
                  : colGroup.length - 1
                : colIndex + 1 < colGroup.length
                ? colIndex + 1
                : 0
            ];
          if (nextCol.colIndex !== undefined) {
            setStoreState({
              scrollLeft: getAvailScrollLeft(
                nextCol.colIndex,
                getScrollLeftOptions,
              ),
              selectionCols: {
                [nextCol.colIndex]: true,
              },
              focusedCol: nextCol.colIndex,
              isInlineEditing: true,
              inlineEditingCell: {
                rowIndex: rowIndex,
                colIndex: nextCol.colIndex,
                editor: nextCol.editor,
              },
            });
          }

          break;
        // case DataGridEnums.KeyCodes.SPACE:
        case DataGridEnums.KeyCodes.ENTER:
          e.preventDefault();

          const item: IDataGrid.IDataItem = data[rowIndex];
          const value = item.value[colGroup[colIndex].key!];
          // console.log('checkbox event fire SPACE, ENTER', e.which);

          const disabled = editor.disable
            ? editor.disable({
                col: colGroup[colIndex],
                rowIndex,
                colIndex,
                item,
                value,
              })
            : false;

          if (disabled) {
            return;
          }
          dispatch(DataGridEnums.DispatchTypes.UPDATE, {
            row: rowIndex,
            col: colGroup[colIndex],
            colIndex,
            value: !value,
            eventWhichKey: 'click-checkbox',
            keepEditing: false,
          });

          break;
        default:
      }
    }
  };

  // onFireEvent = async (e: any) => {
  //   const {
  //     loading,
  //     loadingData,
  //     isInlineEditing = false,
  //     inlineEditingCell,
  //     colGroup = [],
  //     focusedRow = -1,
  //     focusedCol = -1,
  //     data = {},
  //   } = this.props;

  //   let stopEvent =
  //     isInlineEditing &&
  //     inlineEditingCell &&
  //     inlineEditingCell.colIndex === focusedCol &&
  //     inlineEditingCell.rowIndex === focusedRow;

  //   if (this.busy || loadingData || loading) {
  //     e.preventDefault();
  //     return;
  //   }

  //   if (e.type === DataGridEnums.EventNames.KEYDOWN && colGroup[focusedCol]) {
  //     const colEditor = colGroup[focusedCol].editor;
  //     const editor: IDataGrid.IColEditor =
  //       colEditor === 'text'
  //         ? { type: 'text' }
  //         : (colEditor as IDataGrid.IColEditor);

  //     if (editor) {
  //       if (editor.type === 'checkbox') {
  //         this.onKeyDownInlineEditor(e);
  //         stopEvent = false;
  //       } else {
  //         const item: IDataGrid.IDataItem = data[focusedRow];
  //         if (item) {
  //           const value = item.value[colGroup[focusedCol].key!];
  //           const disabled = editor.disable
  //             ? editor.disable({
  //                 col: colGroup[focusedCol],
  //                 rowIndex: focusedRow,
  //                 colIndex: focusedCol,
  //                 item,
  //                 value,
  //               })
  //             : false;

  //           if (disabled) {
  //             stopEvent = false;
  //           }
  //         }
  //       }
  //     }
  //   }

  //   if (stopEvent) {
  //     return;
  //   }

  //   if (this.props.onBeforeEvent) {
  //     this.props.onBeforeEvent({ e, eventName: e.type });
  //   }

  //   switch (e.type) {
  //     case DataGridEnums.EventNames.KEYDOWN:
  //       this.busy = true;
  //       try {
  //         await this.onKeyDown(e);
  //       } catch (err) {
  //         if (this.props.onError) {
  //           this.props.onError(err, e);
  //         } else {
  //           // console.log(err);
  //         }
  //       }
  //       this.busy = false;
  //       break;
  //     case DataGridEnums.EventNames.KEYUP:
  //       this.onKeyUp(e);
  //       break;
  //     case DataGridEnums.EventNames.CONTEXTMENU:
  //       this.onContextmenu(e);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  onKeyDown = async (e: KeyboardEvent) => {
    const {
      loading,
      loadingData,
      isInlineEditing = false,
      inlineEditingCell,
      colGroup = [],
      focusedRow = -1,
      focusedCol = -1,
      data = {},
    } = this.props;

    let stopEvent =
      isInlineEditing &&
      inlineEditingCell &&
      inlineEditingCell.colIndex === focusedCol &&
      inlineEditingCell.rowIndex === focusedRow;

    if (this.busy || loadingData || loading) {
      e.preventDefault();
      return;
    }

    if (colGroup[focusedCol]) {
      const colEditor = colGroup[focusedCol].editor;
      const editor: IDataGrid.IColEditor =
        colEditor === 'text'
          ? { type: 'text' }
          : (colEditor as IDataGrid.IColEditor);

      if (editor) {
        if (editor.type === 'checkbox') {
          this.onKeyDownInlineEditor(e);
          stopEvent = false;
        } else {
          const item: IDataGrid.IDataItem = data[focusedRow];
          if (item) {
            const value = item.value[colGroup[focusedCol].key!];
            const disabled = editor.disable
              ? editor.disable({
                  col: colGroup[focusedCol],
                  rowIndex: focusedRow,
                  colIndex: focusedCol,
                  item,
                  value,
                })
              : false;

            if (disabled) {
              stopEvent = false;
            }
          }
        }
      }
    }

    if (stopEvent) {
      return;
    }

    e.preventDefault();

    this.busy = true;
    try {
      await this.handleKeyDown(e);
    } catch (err) {
      if (this.props.onError) {
        this.props.onError(err, e);
      } else {
        // console.log(err);
      }
    }
    this.busy = false;
  };

  componentDidMount() {
    const { rootNode } = this.props;
    if (rootNode && rootNode.current) {
      rootNode.current.addEventListener('keydown', this.onKeyDown, false);
      // rootNode.current.addEventListener('keyup', this.onFireEvent, false);
      rootNode.current.addEventListener(
        'contextmenu',
        this.onContextmenu,
        false,
      );
    }
  }

  componentWillUnmount() {
    const { rootNode } = this.props;
    if (rootNode && rootNode.current) {
      rootNode.current.removeEventListener('keydown', this.onKeyDown);
      // rootNode.current.removeEventListener('keyup', this.onFireEvent);
      rootNode.current.removeEventListener('contextmenu', this.onContextmenu);
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default connectStore(DataGridEvents);
