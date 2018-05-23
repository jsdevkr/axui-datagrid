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
require("styles/globals");
var react_router_dom_1 = require("react-router-dom");
var react_hot_loader_1 = require("react-hot-loader");
var components_1 = require("components");
var Index_1 = require("./Samples/Index");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (React.createElement(components_1.ErrorBoundary, null, React.createElement(react_router_dom_1.BrowserRouter, null, React.createElement(react_router_dom_1.Switch, null, React.createElement(react_router_dom_1.Route, { path: "/", component: Index_1.default }), React.createElement(react_router_dom_1.Route, { component: components_1.NoMatch })))));
    };
    return App;
}(React.Component));
exports.default = react_hot_loader_1.hot(module)(App);
//# sourceMappingURL=App.js.map