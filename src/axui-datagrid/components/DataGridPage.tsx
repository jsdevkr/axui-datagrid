import * as React from 'react';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import {
  classNames as CX,
  isFunction,
  getScrollPosition,
  formatCurrency,
} from '../utils';
import { IDataGrid } from '../common/@types';
import { DataGridEnums } from '../common/@enums';
import PageButtons from './DataGridPageButtons';

interface IProps extends IDataGridStore {}

class DataGridPage extends React.Component<IProps> {
  state = {};

  // onClickPageButton = (
  //   e: React.MouseEvent<HTMLElement>,
  //   userFunction: string | IDataGrid.userCallBackFunction,
  // ) => {
  //   const {
  //     data = [],
  //     scrollLeft = 0,
  //     scrollTop = 0,
  //     focusedRow = 0,
  //     options = {},
  //     styles = {},
  //     setStoreState,
  //   } = this.props;

  //   const { frozenRowIndex = 0 } = options;
  //   const {
  //     bodyTrHeight = 0,
  //     bodyHeight = 0,
  //     scrollContentWidth = 0,
  //     scrollContentHeight = 0,
  //     scrollContentContainerWidth = 0,
  //     scrollContentContainerHeight = 0,
  //   } = styles;

  //   const sRowIndex = Math.floor(-scrollTop / bodyTrHeight) + frozenRowIndex;
  //   const eRowIndex =
  //     Math.floor(-scrollTop / bodyTrHeight) +
  //     frozenRowIndex +
  //     Math.floor(bodyHeight / bodyTrHeight);
  //   const pRowSize = Math.floor(bodyHeight / bodyTrHeight);
  //   const getAvailScrollTop = (rowIndex: number): number => {
  //     let _scrollTop: number | undefined = undefined;

  //     if (sRowIndex >= rowIndex) {
  //       _scrollTop = -rowIndex * bodyTrHeight;
  //     } else if (eRowIndex <= rowIndex) {
  //       _scrollTop =
  //         -rowIndex * bodyTrHeight + (pRowSize * bodyTrHeight - bodyTrHeight);
  //     }

  //     if (typeof _scrollTop !== 'undefined') {
  //       _scrollTop = getScrollPosition(scrollLeft, _scrollTop, {
  //         scrollWidth: scrollContentWidth,
  //         scrollHeight: scrollContentHeight,
  //         clientWidth: scrollContentContainerWidth,
  //         clientHeight: scrollContentContainerHeight,
  //       }).scrollTop;
  //     } else {
  //       _scrollTop = scrollTop;
  //     }

  //     return _scrollTop;
  //   };

  //   const proc = {
  //     [DataGridEnums.PageButtonActions.PAGE_FIRST]: () => {
  //       const focusRow = 0;
  //       setStoreState({
  //         scrollTop: getAvailScrollTop(focusRow),
  //         selectionRows: {
  //           [focusRow]: true,
  //         },
  //         focusedRow: focusRow,
  //       });
  //     },
  //     [DataGridEnums.PageButtonActions.PAGE_PREV]: () => {
  //       const focusRow = focusedRow - pRowSize < 1 ? 0 : focusedRow - pRowSize;

  //       setStoreState({
  //         scrollTop: getAvailScrollTop(focusRow),
  //         selectionRows: {
  //           [focusRow]: true,
  //         },
  //         focusedRow: focusRow,
  //       });
  //     },
  //     [DataGridEnums.PageButtonActions.PAGE_BACK]: () => {
  //       let focusRow = focusedRow < 1 ? 0 : focusedRow - 1;

  //       setStoreState({
  //         scrollTop: getAvailScrollTop(focusRow),
  //         selectionRows: {
  //           [focusRow]: true,
  //         },
  //         focusedRow: focusRow,
  //       });
  //     },
  //     [DataGridEnums.PageButtonActions.PAGE_PLAY]: () => {
  //       let focusRow =
  //         focusedRow + 1 >= data.length
  //           ? data.length - 1
  //           : focusedRow + 1;

  //       setStoreState({
  //         scrollTop: getAvailScrollTop(focusRow),
  //         selectionRows: {
  //           [focusRow]: true,
  //         },
  //         focusedRow: focusRow,
  //       });
  //     },
  //     [DataGridEnums.PageButtonActions.PAGE_NEXT]: () => {
  //       let focusRow =
  //         focusedRow + pRowSize >= data.length
  //           ? data.length - 1
  //           : focusedRow + pRowSize;

  //       setStoreState({
  //         scrollTop: getAvailScrollTop(focusRow),
  //         selectionRows: {
  //           [focusRow]: true,
  //         },
  //         focusedRow: focusRow,
  //       });
  //     },
  //     [DataGridEnums.PageButtonActions.PAGE_LAST]: () => {
  //       const focusRow = data.length - 1;

  //       setStoreState({
  //         scrollTop: getAvailScrollTop(focusRow),
  //         selectionRows: {
  //           [focusRow]: true,
  //         },
  //         focusedRow: focusRow,
  //       });
  //     },
  //   };

  //   if (isFunction(userFunction)) {
  //     (userFunction as Function)();
  //   } else if (typeof userFunction === 'string' && userFunction in proc) {
  //     proc[userFunction]();
  //   }
  // };

  render() {
    const { options = {}, styles = {}, status, data = [] } = this.props;
    const { horizontalScrollerWidth } = styles;
    const { page: optionPage = {} } = options;
    const { height } = optionPage;

    return (
      <div className="axui-datagrid-page" style={{ height: styles.pageHeight }}>
        <div className="axui-datagrid-page-status">
          {status ? status : `Total ${formatCurrency(data.length)} Items`}
        </div>
        <div style={{ width: horizontalScrollerWidth }} />
      </div>
    );
  }
}

export default connectStore(DataGridPage);
