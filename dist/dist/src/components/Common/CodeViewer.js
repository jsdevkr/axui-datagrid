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
var prism_light_1 = require("react-syntax-highlighter/prism-light");
var jsx_1 = require("react-syntax-highlighter/languages/prism/jsx");
var prism_1 = require("react-syntax-highlighter/styles/prism/prism");
function trimLineBreak(x) {
    return x.replace(/^\r?\n+/, '').replace(/\r?\n+\s*$/, '');
}
var CodeViewer = /** @class */ (function (_super) {
    __extends(CodeViewer, _super);
    function CodeViewer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CodeViewer.prototype.render = function () {
        prism_light_1.registerLanguage('jsx', jsx_1.default);
        prism_1.default['pre[class*="language-"]'].borderRadius = '5px';
        prism_1.default['pre[class*="language-"]'].border = '1px solid #e7e7e7';
        return (React.createElement(prism_light_1.default, { language: "jsx", style: prism_1.default }, this.props.code
            ? trimLineBreak(this.props.code)
            : trimLineBreak('' + this.props.children)));
    };
    return CodeViewer;
}(React.Component));
exports.default = CodeViewer;
//# sourceMappingURL=CodeViewer.js.map