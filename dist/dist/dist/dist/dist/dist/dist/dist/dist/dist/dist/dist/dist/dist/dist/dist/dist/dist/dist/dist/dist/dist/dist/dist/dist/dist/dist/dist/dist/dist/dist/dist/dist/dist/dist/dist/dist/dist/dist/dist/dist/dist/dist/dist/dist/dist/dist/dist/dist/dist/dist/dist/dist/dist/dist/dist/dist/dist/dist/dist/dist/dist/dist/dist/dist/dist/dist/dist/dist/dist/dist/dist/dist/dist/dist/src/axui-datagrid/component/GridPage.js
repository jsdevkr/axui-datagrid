"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var GridPage = /** @class */ (function (_super) {
    __extends(GridPage, _super);
    function GridPage(props) {
        return _super.call(this, props) || this;
    }
    GridPage.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var sameProps = false;
        if (this.props.mounted !== nextProps.mounted ||
            this.props.pageButtons !== nextProps.pageButtons ||
            this.props.styles !== nextProps.styles) {
            sameProps = true;
        }
        return sameProps;
    };
    GridPage.prototype.render = function () {
        var _a = this.props, mounted = _a.mounted, styles = _a.styles, pageButtonsContainerWidth = _a.pageButtonsContainerWidth, pageButtons = _a.pageButtons, pageButtonHeight = _a.pageButtonHeight, onClickPageButton = _a.onClickPageButton;
        if (!mounted)
            return null;
        return (React.createElement("div", { className: classnames_1.default('axd-page'), style: { height: styles.pageHeight } }, React.createElement("div", { className: classnames_1.default('axd-page-buttons'), style: { width: pageButtonsContainerWidth } }, pageButtons.map(function (button, bi) {
            return (React.createElement("button", { key: bi, style: {
                    height: pageButtonHeight,
                    width: button.width || pageButtonHeight,
                }, onClick: function (e) { return onClickPageButton(e, button.onClick); } }, React.createElement("div", { "data-button-svg": true, className: classnames_1.default(button.className) })));
        }))));
    };
    return GridPage;
}(React.Component));
exports.GridPage = GridPage;
//# sourceMappingURL=GridPage.js.map