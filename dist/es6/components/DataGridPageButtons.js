"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
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
exports.default = PageButtons;
