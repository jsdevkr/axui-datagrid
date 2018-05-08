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
var Examples_1 = require("./Examples");
var semantic_ui_react_1 = require("semantic-ui-react");
var components_1 = require("components");
var basicRaw = require('!raw-loader!./Examples/components/Basic.tsx');
var customizeStyleRaw = require('!raw-loader!./Examples/components/CustomizeStyle.tsx');
var axuiLogo = require("assets/axui-logo.png");
var GitHubButton = require('react-github-button');
var Index = /** @class */ (function (_super) {
    __extends(Index, _super);
    function Index() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            viewBasicRaw: false,
            viewCustomizeStyleRaw: false,
        };
        return _this;
    }
    Index.prototype.render = function () {
        var _this = this;
        var _a = this.state, viewBasicRaw = _a.viewBasicRaw, viewCustomizeStyleRaw = _a.viewCustomizeStyleRaw;
        return (React.createElement(React.Fragment, null, React.createElement("header", { className: 'app-header' }, React.createElement(semantic_ui_react_1.Container, null, React.createElement("div", { className: 'logo-img' }, React.createElement("img", { src: axuiLogo })), React.createElement("h1", null, "react-multi-email"), React.createElement("div", null, React.createElement(GitHubButton, { type: "stargazers", size: "large", namespace: "axui", repo: "react-multi-email" }), ' ', React.createElement(GitHubButton, { type: "forks", size: "large", namespace: "axui", repo: "react-multi-email" })))), React.createElement(semantic_ui_react_1.Container, null, React.createElement(semantic_ui_react_1.Grid, { padded: true }, React.createElement(semantic_ui_react_1.Grid.Row, null, React.createElement(semantic_ui_react_1.Grid.Column, null, React.createElement(semantic_ui_react_1.Header, { as: "h2" }, "Installation"), React.createElement(components_1.CodeViewer, null, "npm install react-multi-email -S"), React.createElement(components_1.CodeViewer, { code: "\nimport 'react-multi-email/style.css';\nimport { ReactMultiEmail } from 'react-multi-email';\n" }))), React.createElement(semantic_ui_react_1.Grid.Row, null, React.createElement(semantic_ui_react_1.Grid.Column, null, React.createElement(semantic_ui_react_1.Header, { as: "h2" }, "basic"), React.createElement(Examples_1.Basic, null), React.createElement(semantic_ui_react_1.Checkbox, { label: "Show Code", checked: viewBasicRaw, onChange: function (e, data) {
                _this.setState({ viewBasicRaw: data.checked });
            } }), viewBasicRaw ? React.createElement(components_1.CodeViewer, { code: basicRaw }) : null)), React.createElement(semantic_ui_react_1.Grid.Row, null, React.createElement(semantic_ui_react_1.Grid.Column, null, React.createElement(semantic_ui_react_1.Header, { as: "h2" }, "customize style"), React.createElement(Examples_1.CustomizeStyle, null), React.createElement(semantic_ui_react_1.Checkbox, { label: "Show Code", checked: viewCustomizeStyleRaw, onChange: function (e, data) {
                _this.setState({ viewCustomizeStyleRaw: data.checked });
            } }), viewCustomizeStyleRaw ? (React.createElement(components_1.CodeViewer, { code: customizeStyleRaw })) : null))))));
    };
    return Index;
}(React.Component));
exports.default = Index;
//# sourceMappingURL=Index.js.map