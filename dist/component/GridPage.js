"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
class GridPage extends React.Component {
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
        const { mounted, styles, pageButtonsContainerWidth, pageButtons, pageButtonHeight, onClickPageButton, } = this.props;
        if (!mounted)
            return null;
        return (React.createElement("div", { className: classnames_1.default('axd-page'), style: { height: styles.pageHeight } },
            React.createElement("div", { className: classnames_1.default('axd-page-buttons'), style: { width: pageButtonsContainerWidth } }, pageButtons.map((button, bi) => {
                return (React.createElement("button", { key: bi, style: {
                        height: pageButtonHeight,
                        width: button.width || pageButtonHeight,
                    }, onClick: e => onClickPageButton(e, button.onClick) },
                    React.createElement("div", { "data-button-svg": true, className: classnames_1.default(button.className) })));
            }))));
    }
}
exports.GridPage = GridPage;
