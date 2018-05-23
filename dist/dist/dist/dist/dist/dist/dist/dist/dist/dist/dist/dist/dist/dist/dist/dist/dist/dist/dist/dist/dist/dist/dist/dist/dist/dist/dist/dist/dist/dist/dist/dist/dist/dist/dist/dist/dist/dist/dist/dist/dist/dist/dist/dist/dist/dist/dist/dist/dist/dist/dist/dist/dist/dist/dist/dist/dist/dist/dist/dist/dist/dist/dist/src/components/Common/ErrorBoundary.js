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
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErrorBoundary.prototype.componentDidCatch = function () {
        if (process.env.NODE_ENV === 'production') {
            typeof window !== 'undefined' && window.location.reload(true);
        }
    };
    ErrorBoundary.prototype.render = function () {
        return this.props.children;
    };
    return ErrorBoundary;
}(React.Component));
exports.default = ErrorBoundary;
//# sourceMappingURL=ErrorBoundary.js.map