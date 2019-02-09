"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("../utils");
var PageButtons = function (_a) {
    var pageButtons = _a.pageButtons, pageButtonHeight = _a.pageButtonHeight, onClickPageButton = _a.onClickPageButton;
    return (React.createElement(React.Fragment, null, pageButtons.map(function (button, bi) {
        return (React.createElement("button", { key: bi, style: {
                height: pageButtonHeight,
                width: button.width || pageButtonHeight,
            }, onClick: function (e) {
                onClickPageButton(e, button.onClick);
            } },
            React.createElement("div", { "data-button-svg": true, className: utils_1.classNames(button.className) })));
    })));
};
exports.default = PageButtons;
