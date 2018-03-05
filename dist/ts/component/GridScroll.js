"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
class GridScroll extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.onClickScrollTrack = this.onClickScrollTrack.bind(this);
    }
    onClickScrollTrack(e, barName) {
        e.preventDefault();
        if (e.target.getAttribute('data-scroll')) {
            this.props.onClickScrollTrack(e, barName);
        }
    }
    render() {
        const { mounted, bodyHeight, pageHeight, verticalScrollerHeight, verticalScrollerWidth, horizontalScrollerWidth, horizontalScrollerHeight, verticalScrollBarHeight, horizontalScrollBarWidth, scrollerArrowSize, scrollerPadding, scrollBarLeft, scrollBarTop, onMouseDownScrollBar, onClickScrollArrow, } = this.props;
        if (!mounted)
            return null;
        if (verticalScrollerWidth === 0 && horizontalScrollerHeight === 0)
            return null;
        let arrowWidth = (scrollerArrowSize - scrollerPadding * 2) / 2;
        let verticalArrowStyles = {
            width: verticalScrollerWidth,
            height: scrollerArrowSize / 2 + scrollerPadding
        };
        let verticalTopArrowStyles = {
            left: scrollerPadding,
            top: (verticalArrowStyles.height - arrowWidth) / 2,
            borderTop: '0 none',
            borderRight: 'solid ' + arrowWidth + 'px transparent',
            borderBottomWidth: (arrowWidth) + 'px',
            borderLeft: 'solid ' + arrowWidth + 'px transparent'
        };
        let verticalBottomArrowStyles = {
            left: scrollerPadding,
            top: (verticalArrowStyles.height - arrowWidth) / 2,
            borderTopWidth: (arrowWidth) + 'px',
            borderRight: 'solid ' + arrowWidth + 'px transparent',
            borderBottom: '0 none',
            borderLeft: 'solid ' + arrowWidth + 'px transparent'
        };
        let verticalStyles = {
            width: verticalScrollerWidth,
            height: verticalScrollerHeight + scrollerPadding * 2 + scrollerArrowSize,
            bottom: pageHeight,
            padding: scrollerPadding,
            paddingTop: scrollerArrowSize / 2 + scrollerPadding
        };
        let verticalBarStyles = {
            height: verticalScrollBarHeight,
            top: scrollBarTop
        };
        let horizontalArrowStyles = {
            width: scrollerArrowSize / 2 + scrollerPadding,
            height: horizontalScrollerHeight
        };
        let horizontalLeftArrowStyles = {
            left: (horizontalArrowStyles.width - arrowWidth) / 2,
            top: scrollerPadding,
            borderTop: 'solid ' + arrowWidth + 'px transparent',
            borderRightWidth: (arrowWidth) + 'px',
            borderBottom: 'solid ' + arrowWidth + 'px transparent',
            borderLeft: '0 none'
        };
        let horizontalRightArrowStyles = {
            left: (horizontalArrowStyles.width - arrowWidth) / 2,
            top: scrollerPadding,
            borderTop: 'solid ' + arrowWidth + 'px transparent',
            borderRight: '0 none',
            borderBottom: 'solid ' + arrowWidth + 'px transparent',
            borderLeftWidth: (arrowWidth) + 'px'
        };
        let horizontalStyles = {
            width: horizontalScrollerWidth + scrollerPadding * 2 + scrollerArrowSize,
            height: horizontalScrollerHeight,
            bottom: (pageHeight - 1 - horizontalScrollerHeight) / 2,
            right: (pageHeight - 1 - horizontalScrollerHeight) / 2,
            padding: scrollerPadding,
            paddingLeft: scrollerArrowSize / 2 + scrollerPadding
        };
        let horizontalBarStyles = {
            width: horizontalScrollBarWidth,
            left: scrollBarLeft
        };
        return (react_1.default.createElement("div", { className: classnames_1.default('axd-scroller') },
            (verticalScrollerWidth) ? (react_1.default.createElement("div", { "data-scroll-track": 'vertical', style: verticalStyles },
                react_1.default.createElement("div", { "data-scroll-arrow": 'up', style: verticalArrowStyles },
                    react_1.default.createElement("div", { "data-arrow": true, style: verticalTopArrowStyles, onClick: e => onClickScrollArrow(e, 'up') })),
                react_1.default.createElement("div", { "data-scroll": 'vertical', onClick: e => this.onClickScrollTrack(e, 'vertical') },
                    react_1.default.createElement("div", { className: classnames_1.default('axd-scroll-bar'), style: verticalBarStyles, onMouseDown: e => onMouseDownScrollBar(e, 'vertical') })),
                react_1.default.createElement("div", { "data-scroll-arrow": 'down', style: verticalArrowStyles },
                    react_1.default.createElement("div", { "data-arrow": true, style: verticalBottomArrowStyles, onClick: e => onClickScrollArrow(e, 'down') })))) : null,
            (horizontalScrollerHeight) ? (react_1.default.createElement("div", { "data-scroll-track": 'horizontal', style: horizontalStyles },
                react_1.default.createElement("div", { "data-scroll-arrow": 'left', style: horizontalArrowStyles },
                    react_1.default.createElement("div", { "data-arrow": true, style: horizontalLeftArrowStyles, onClick: e => onClickScrollArrow(e, 'left') })),
                react_1.default.createElement("div", { "data-scroll": 'horizontal', onClick: e => this.onClickScrollTrack(e, 'horizontal') },
                    react_1.default.createElement("div", { className: classnames_1.default('axd-scroll-bar'), style: horizontalBarStyles, onMouseDown: (e) => onMouseDownScrollBar(e, 'horizontal') })),
                react_1.default.createElement("div", { "data-scroll-arrow": 'right', style: horizontalArrowStyles },
                    react_1.default.createElement("div", { "data-arrow": true, style: horizontalRightArrowStyles, onClick: e => onClickScrollArrow(e, 'right') })))) : null));
    }
}
exports.GridScroll = GridScroll;
//# sourceMappingURL=GridScroll.js.map