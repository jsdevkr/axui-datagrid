"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
class GridPage extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        let sameProps = false;
        if (this.props.mounted !== nextProps.mounted ||
            this.props.pageButtons !== nextProps.pageButtons ||
            this.props.styles !== nextProps.styles) {
            sameProps = true;
        }
        return sameProps;
    }
    render() {
        const { mounted, styles, pageButtonsContainerWidth, pageButtons, pageButtonHeight, onClickPageButton } = this.props;
        if (!mounted)
            return null;
        return (react_1.default.createElement("div", { className: classnames_1.default('axd-page'), style: { height: styles.pageHeight } },
            react_1.default.createElement("div", { className: classnames_1.default('axd-page-buttons'), style: { width: pageButtonsContainerWidth } }, pageButtons.map((button, bi) => {
                return react_1.default.createElement("button", { key: bi, style: { height: pageButtonHeight, width: button.width || pageButtonHeight }, onClick: e => onClickPageButton(e, button.onClick) },
                    react_1.default.createElement("div", { "data-button-svg": true, className: classnames_1.default(button.className) }));
            }))));
    }
}
exports.GridPage = GridPage;
//# sourceMappingURL=GridPage.js.map