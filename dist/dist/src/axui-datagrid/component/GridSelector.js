"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var GridSelector = /** @class */ (function (_super) {
    __extends(GridSelector, _super);
    function GridSelector(props) {
        return _super.call(this, props) || this;
    }
    GridSelector.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var sameProps = false;
        if (this.props.selecting !== nextProps.selecting ||
            this.props.selectionMinOffset !== nextProps.selectionMinOffset ||
            this.props.selectionMaxOffset !== nextProps.selectionMaxOffset) {
            sameProps = true;
        }
        return sameProps;
    };
    GridSelector.prototype.render = function () {
        var _a = this.props, selecting = _a.selecting, selectionMinOffset = _a.selectionMinOffset, selectionMaxOffset = _a.selectionMaxOffset;
        if (!selecting)
            return null;
        var selectorStyles = {
            left: selectionMinOffset.x,
            top: selectionMinOffset.y,
            width: selectionMaxOffset.x - selectionMinOffset.x,
            height: selectionMaxOffset.y - selectionMinOffset.y,
        };
        return React.createElement("div", { className: classnames_1.default(''), style: selectorStyles });
    };
    return GridSelector;
}(React.Component));
exports.GridSelector = GridSelector;
//# sourceMappingURL=GridSelector.js.map