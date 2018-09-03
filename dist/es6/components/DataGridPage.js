"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const stores_1 = require("../stores");
const hoc_1 = require("../hoc");
const utils_1 = require("../utils");
const PageButtons = ({ pageButtons, pageButtonHeight, onClickPageButton }) => (React.createElement(React.Fragment, null, pageButtons.map((button, bi) => {
    return (React.createElement("button", { key: bi, style: {
            height: pageButtonHeight,
            width: button.width || pageButtonHeight,
        }, onClick: (e) => {
            onClickPageButton(e, button.onClick);
        } },
        React.createElement("div", { "data-button-svg": true, className: utils_1.classNames(button.className) })));
})));
class DataGridPage extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.onClickPageButton = (e, userFunction) => {
            const { filteredList = [], scrollLeft = 0, scrollTop = 0, focusedRow = 0, options = {}, styles = {}, setStoreState, } = this.props;
            const { frozenRowIndex = 0 } = options;
            const { bodyTrHeight = 0, bodyHeight = 0, scrollContentWidth = 0, scrollContentHeight = 0, scrollContentContainerWidth = 0, scrollContentContainerHeight = 0, } = styles;
            const sRowIndex = Math.floor(-scrollTop / bodyTrHeight) + frozenRowIndex;
            const eRowIndex = Math.floor(-scrollTop / bodyTrHeight) +
                frozenRowIndex +
                Math.floor(bodyHeight / bodyTrHeight);
            const pRowSize = Math.floor(bodyHeight / bodyTrHeight);
            const getAvailScrollTop = (rowIndex) => {
                let _scrollTop = undefined;
                if (sRowIndex >= rowIndex) {
                    _scrollTop = -rowIndex * bodyTrHeight;
                }
                else if (eRowIndex <= rowIndex) {
                    _scrollTop =
                        -rowIndex * bodyTrHeight + (pRowSize * bodyTrHeight - bodyTrHeight);
                }
                if (typeof _scrollTop !== 'undefined') {
                    _scrollTop = utils_1.getScrollPosition(scrollLeft, _scrollTop, {
                        scrollWidth: scrollContentWidth,
                        scrollHeight: scrollContentHeight,
                        clientWidth: scrollContentContainerWidth,
                        clientHeight: scrollContentContainerHeight,
                    }).scrollTop;
                }
                else {
                    _scrollTop = scrollTop;
                }
                return _scrollTop;
            };
            const proc = {
                [stores_1.PageButtonActions.PAGE_FIRST]: () => {
                    const focusRow = 0;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: {
                            [focusRow]: true,
                        },
                        focusedRow: focusRow,
                    });
                },
                [stores_1.PageButtonActions.PAGE_PREV]: () => {
                    const focusRow = focusedRow - pRowSize < 1 ? 0 : focusedRow - pRowSize;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: {
                            [focusRow]: true,
                        },
                        focusedRow: focusRow,
                    });
                },
                [stores_1.PageButtonActions.PAGE_BACK]: () => {
                    let focusRow = focusedRow < 1 ? 0 : focusedRow - 1;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: {
                            [focusRow]: true,
                        },
                        focusedRow: focusRow,
                    });
                },
                [stores_1.PageButtonActions.PAGE_PLAY]: () => {
                    let focusRow = focusedRow + 1 >= filteredList.length
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
                [stores_1.PageButtonActions.PAGE_NEXT]: () => {
                    let focusRow = focusedRow + pRowSize >= filteredList.length
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
                [stores_1.PageButtonActions.PAGE_LAST]: () => {
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
            if (utils_1.isFunction(userFunction)) {
                userFunction();
            }
            else if (typeof userFunction === 'string' && userFunction in proc) {
                proc[userFunction]();
            }
        };
    }
    render() {
        const { options = {}, styles = {} } = this.props;
        const { pageButtonsContainerWidth } = styles;
        const { page: optionPage = {} } = options;
        const { buttons: pageButtons = [], buttonHeight: pageButtonHeight = 0, } = optionPage;
        return (React.createElement("div", { className: "axui-datagrid-page", style: { height: styles.pageHeight } },
            React.createElement("div", { className: "axui-datagrid-page-buttons", style: { width: pageButtonsContainerWidth } },
                React.createElement(PageButtons, { pageButtons: pageButtons, pageButtonHeight: pageButtonHeight, onClickPageButton: this.onClickPageButton }))));
    }
}
exports.default = hoc_1.connectStore(DataGridPage);
//# sourceMappingURL=DataGridPage.js.map