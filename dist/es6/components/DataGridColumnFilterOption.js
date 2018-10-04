"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const hoc_1 = require("../hoc");
const utils_1 = require("../utils");
class DatagridColumnFilterOption extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            mounted: false,
            scrollTop: 0,
            clientHeight: 0,
            scrollHeight: 0,
        };
        this.onScroll = (e) => {
            this.setState({
                scrollTop: e.currentTarget.scrollTop,
            });
        };
        this.setContainerNode = (element) => {
            this.containerNode = ReactDOM.findDOMNode(element);
        };
    }
    getOption() {
        const { filterOptions, optionItemHeight, onChange } = this.props;
        const { scrollTop, clientHeight } = this.state;
        let sIndex = Math.floor(scrollTop / optionItemHeight);
        let eIndex = Math.floor(scrollTop / optionItemHeight) +
            Math.ceil(clientHeight / optionItemHeight);
        if (eIndex > filterOptions.length) {
            eIndex = filterOptions.length;
        }
        const paddingTopNode = (React.createElement("div", { style: { height: sIndex * optionItemHeight } }));
        const paddingBottomNode = (React.createElement("div", { style: {
                height: (filterOptions.length - eIndex) * optionItemHeight,
            } }));
        return (React.createElement("div", null,
            paddingTopNode,
            utils_1.arrayFromRange(sIndex, eIndex).map((i) => {
                const option = filterOptions[i];
                if (option) {
                    return (React.createElement("div", { key: i, "data-option": true, "data-checked": option.checked, style: { lineHeight: optionItemHeight + 'px' }, onClick: (e) => {
                            onChange(option.value, !option.checked, option.checkAll);
                        } },
                        React.createElement("div", { className: "axui-datagrid-option-check-box" }),
                        React.createElement("span", { className: "axui-datagrid-option-text" }, option.text)));
                }
                return;
            }),
            paddingBottomNode));
    }
    componentDidMount() {
        const { filterOptions, optionItemHeight } = this.props;
        this.setState({
            mounted: true,
            clientHeight: utils_1.getInnerHeight(ReactDOM.findDOMNode(this.containerNode)),
            scrollHeight: filterOptions.length * optionItemHeight,
        });
    }
    render() {
        const { mounted } = this.state;
        return (React.createElement("div", { "data-options": "", ref: this.setContainerNode, onScroll: utils_1.throttle(this.onScroll, 100) }, mounted ? this.getOption() : null));
    }
}
exports.default = hoc_1.connectStore(DatagridColumnFilterOption);
