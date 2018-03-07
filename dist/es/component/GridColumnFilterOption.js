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
const ReactDOM = __importStar(require("react-dom"));
const immutable_1 = require("immutable");
const lodash_1 = require("lodash");
const classnames_1 = __importDefault(require("classnames"));
const util_1 = require("../util");
class GridColumnFilterOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mounted: false,
            scrollTop: 0,
            clientHeight: 0,
            scrollHeight: props.options.length * 20,
            optionItemHeight: 20
        };
        this.onScroll = this.onScroll.bind(this);
    }
    componentDidMount() {
        const clientHeight = util_1.getInnerHeight(ReactDOM.findDOMNode(this.refs['options-container']));
        this.setState({
            mounted: true,
            clientHeight: clientHeight
        });
    }
    getOption() {
        const { options, onChange } = this.props;
        let sIndex = Math.floor(this.state.scrollTop / this.state.optionItemHeight);
        let eIndex = Math.floor(this.state.scrollTop / this.state.optionItemHeight) + Math.ceil(this.state.clientHeight / this.state.optionItemHeight);
        if (eIndex > options.length)
            eIndex = options.length;
        const paddingTopNode = React.createElement("div", { style: { height: sIndex * this.state.optionItemHeight } });
        const paddingBottomNode = React.createElement("div", { style: { height: (options.length - eIndex) * this.state.optionItemHeight } });
        return React.createElement("div", null,
            paddingTopNode,
            immutable_1.Range(sIndex, eIndex).map((i) => {
                const option = options[i];
                return React.createElement("div", { key: i, "data-option": true, "data-checked": option.checked, style: { lineHeight: this.state.optionItemHeight + 'px' }, onClick: e => {
                        onChange(option.value, !option.checked, option.checkAll);
                    } },
                    React.createElement("div", { className: classnames_1.default('axd-option-check-box') }),
                    React.createElement("span", { className: classnames_1.default('axd-option-text') }, option.text));
            }),
            paddingBottomNode);
    }
    onScroll(e) {
        this.setState({
            scrollTop: e.target.scrollTop
        });
    }
    render() {
        return React.createElement("div", { "data-options": '', ref: 'options-container', onScroll: lodash_1.throttle(this.onScroll, 10) }, this.state.mounted ? this.getOption() : null);
    }
}
exports.GridColumnFilterOption = GridColumnFilterOption;
