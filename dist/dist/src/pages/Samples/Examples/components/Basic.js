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
var semantic_ui_react_1 = require("semantic-ui-react");
var Basic = /** @class */ (function (_super) {
    __extends(Basic, _super);
    function Basic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            emails: [],
        };
        return _this;
    }
    Basic.prototype.render = function () {
        var emails = this.state.emails;
        return (React.createElement(React.Fragment, null, React.createElement(semantic_ui_react_1.Segment, null, React.createElement("h1", null, "Basic"))));
    };
    return Basic;
}(React.Component));
exports.default = Basic;
//# sourceMappingURL=Basic.js.map