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
var ReactDOM = require("react-dom");
var immutable_1 = require("immutable");
var lodash_1 = require("lodash");
var classnames_1 = require("classnames");
var util_1 = require("../util");
var GridColumnFilterOption = /** @class */ (function (_super) {
    __extends(GridColumnFilterOption, _super);
    function GridColumnFilterOption(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            mounted: false,
            scrollTop: 0,
            clientHeight: 0,
            scrollHeight: props.options.length * 20,
            optionItemHeight: 20,
        };
        _this.onScroll = _this.onScroll.bind(_this);
        return _this;
    }
    GridColumnFilterOption.prototype.componentDidMount = function () {
        var clientHeight = util_1.getInnerHeight(ReactDOM.findDOMNode(this.refs['options-container']));
        this.setState({
            mounted: true,
            clientHeight: clientHeight,
        });
    };
    GridColumnFilterOption.prototype.getOption = function () {
        var _this = this;
        var _a = this.props, options = _a.options, onChange = _a.onChange;
        var sIndex = Math.floor(this.state.scrollTop / this.state.optionItemHeight);
        var eIndex = Math.floor(this.state.scrollTop / this.state.optionItemHeight) +
            Math.ceil(this.state.clientHeight / this.state.optionItemHeight);
        if (eIndex > options.length)
            eIndex = options.length;
        var paddingTopNode = (React.createElement("div", { style: { height: sIndex * this.state.optionItemHeight } }));
        var paddingBottomNode = (React.createElement("div", { style: {
                height: (options.length - eIndex) * this.state.optionItemHeight,
            } }));
        return (React.createElement("div", null, paddingTopNode, immutable_1.Range(sIndex, eIndex).map(function (i) {
            var option = options[i];
            return (React.createElement("div", { key: i, "data-option": true, "data-checked": option.checked, style: { lineHeight: _this.state.optionItemHeight + 'px' }, onClick: function (e) {
                    onChange(option.value, !option.checked, option.checkAll);
                } }, React.createElement("div", { className: classnames_1.default('axd-option-check-box') }), React.createElement("span", { className: classnames_1.default('axd-option-text') }, option.text)));
        }), paddingBottomNode));
    };
    GridColumnFilterOption.prototype.onScroll = function (e) {
        this.setState({
            scrollTop: e.target.scrollTop,
        });
    };
    GridColumnFilterOption.prototype.render = function () {
        return (React.createElement("div", { "data-options": "", ref: "options-container", onScroll: lodash_1.throttle(this.onScroll, 10) }, this.state.mounted ? this.getOption() : null));
    };
    return GridColumnFilterOption;
}(React.Component));
exports.GridColumnFilterOption = GridColumnFilterOption;
//# sourceMappingURL=GridColumnFilterOption.js.map