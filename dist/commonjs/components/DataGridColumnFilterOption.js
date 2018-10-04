"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var hoc_1 = require("../hoc");
var utils_1 = require("../utils");
var DatagridColumnFilterOption = /** @class */ (function (_super) {
    __extends(DatagridColumnFilterOption, _super);
    function DatagridColumnFilterOption() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            mounted: false,
            scrollTop: 0,
            clientHeight: 0,
            scrollHeight: 0,
        };
        _this.onScroll = function (e) {
            _this.setState({
                scrollTop: e.currentTarget.scrollTop,
            });
        };
        _this.setContainerNode = function (element) {
            _this.containerNode = ReactDOM.findDOMNode(element);
        };
        return _this;
    }
    DatagridColumnFilterOption.prototype.getOption = function () {
        var _a = this.props, filterOptions = _a.filterOptions, optionItemHeight = _a.optionItemHeight, onChange = _a.onChange;
        var _b = this.state, scrollTop = _b.scrollTop, clientHeight = _b.clientHeight;
        var sIndex = Math.floor(scrollTop / optionItemHeight);
        var eIndex = Math.floor(scrollTop / optionItemHeight) +
            Math.ceil(clientHeight / optionItemHeight);
        if (eIndex > filterOptions.length) {
            eIndex = filterOptions.length;
        }
        var paddingTopNode = (React.createElement("div", { style: { height: sIndex * optionItemHeight } }));
        var paddingBottomNode = (React.createElement("div", { style: {
                height: (filterOptions.length - eIndex) * optionItemHeight,
            } }));
        return (React.createElement("div", null,
            paddingTopNode,
            utils_1.arrayFromRange(sIndex, eIndex).map(function (i) {
                var option = filterOptions[i];
                if (option) {
                    return (React.createElement("div", { key: i, "data-option": true, "data-checked": option.checked, style: { lineHeight: optionItemHeight + 'px' }, onClick: function (e) {
                            onChange(option.value, !option.checked, option.checkAll);
                        } },
                        React.createElement("div", { className: "axui-datagrid-option-check-box" }),
                        React.createElement("span", { className: "axui-datagrid-option-text" }, option.text)));
                }
                return;
            }),
            paddingBottomNode));
    };
    DatagridColumnFilterOption.prototype.componentDidMount = function () {
        var _a = this.props, filterOptions = _a.filterOptions, optionItemHeight = _a.optionItemHeight;
        this.setState({
            mounted: true,
            clientHeight: utils_1.getInnerHeight(ReactDOM.findDOMNode(this.containerNode)),
            scrollHeight: filterOptions.length * optionItemHeight,
        });
    };
    DatagridColumnFilterOption.prototype.render = function () {
        var mounted = this.state.mounted;
        return (React.createElement("div", { "data-options": "", ref: this.setContainerNode, onScroll: utils_1.throttle(this.onScroll, 100) }, mounted ? this.getOption() : null));
    };
    return DatagridColumnFilterOption;
}(React.Component));
exports.default = hoc_1.connectStore(DatagridColumnFilterOption);
