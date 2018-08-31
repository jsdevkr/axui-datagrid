import * as React from 'react';
import { types, PageButtonActions } from '../stores';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import { classNames as CX, isFunction, getScrollPosition } from '../utils';

const PageButtons: React.SFC<{
  pageButtons: types.DataGridOptionPageButton[];
  pageButtonHeight: number;
  onClickPageButton: (
    e: React.MouseEvent<HTMLElement>,
    userFunction: string | types.userCallBackFunction,
  ) => void;
}> = ({ pageButtons, pageButtonHeight, onClickPageButton }) => (
  <>
    {pageButtons.map((button, bi) => {
      return (
        <button
          key={bi}
          style={{
            height: pageButtonHeight,
            width: button.width || pageButtonHeight,
          }}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            onClickPageButton(e, button.onClick);
          }}
        >
          <div data-button-svg className={CX(button.className)} />
        </button>
      );
    })}
  </>
);

interface IProps extends IDataGridStore {}

class DataGridPage extends React.Component<IProps> {
  state = {};

  onClickPageButton = (
    e: React.MouseEvent<HTMLElement>,
    userFunction: string | types.userCallBackFunction,
  ) => {
    const {
      filteredList = [],
      scrollLeft = 0,
      scrollTop = 0,
      focusedRow = 0,
      options = {},
      styles = {},
      setStoreState,
    } = this.props;

    const { frozenRowIndex = 0 } = options;
    const {
      bodyTrHeight = 0,
      bodyHeight = 0,
      scrollContentWidth = 0,
      scrollContentHeight = 0,
      scrollContentContainerWidth = 0,
      scrollContentContainerHeight = 0,
    } = styles;

    const sRowIndex = Math.floor(-scrollTop / bodyTrHeight) + frozenRowIndex;
    const eRowIndex =
      Math.floor(-scrollTop / bodyTrHeight) +
      frozenRowIndex +
      Math.floor(bodyHeight / bodyTrHeight);
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

    const proc = {
      [PageButtonActions.PAGE_FIRST]: () => {
        const focusRow = 0;
        setStoreState({
          scrollTop: getAvailScrollTop(focusRow),
          selectionRows: {
            [focusRow]: true,
          },
          focusedRow: focusRow,
        });
      },
      [PageButtonActions.PAGE_PREV]: () => {
        const focusRow = focusedRow - pRowSize < 1 ? 0 : focusedRow - pRowSize;

        setStoreState({
          scrollTop: getAvailScrollTop(focusRow),
          selectionRows: {
            [focusRow]: true,
          },
          focusedRow: focusRow,
        });
      },
      [PageButtonActions.PAGE_BACK]: () => {
        let focusRow = focusedRow < 1 ? 0 : focusedRow - 1;

        setStoreState({
          scrollTop: getAvailScrollTop(focusRow),
          selectionRows: {
            [focusRow]: true,
          },
          focusedRow: focusRow,
        });
      },
      [PageButtonActions.PAGE_PLAY]: () => {
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
      [PageButtonActions.PAGE_NEXT]: () => {
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
      [PageButtonActions.PAGE_LAST]: () => {
        const focusRow = filteredList.length - 1;

        setStoreState({
          scrollTop: getAvailScrollTop(focusRow),
          selectionRows: {
            [focusRow]: true,
          },
          focusedRow: focusRow,
        });
      },
    };

    if (isFunction(userFunction)) {
      (userFunction as Function)();
    } else if (typeof userFunction === 'string' && userFunction in proc) {
      proc[userFunction]();
    }
  };

  render() {
    const { options = {}, styles = {} } = this.props;
    const { pageButtonsContainerWidth } = styles;
    const { page: optionPage = {} } = options;
    const {
      buttons: pageButtons = [],
      buttonHeight: pageButtonHeight = 0,
    } = optionPage;

    return (
      <div className="axui-datagrid-page" style={{ height: styles.pageHeight }}>
        <div
          className="axui-datagrid-page-buttons"
          style={{ width: pageButtonsContainerWidth }}
        >
          <PageButtons
            pageButtons={pageButtons}
            pageButtonHeight={pageButtonHeight}
            onClickPageButton={this.onClickPageButton}
          />
        </div>
      </div>
    );
  }
}

export default connectStore(DataGridPage);
