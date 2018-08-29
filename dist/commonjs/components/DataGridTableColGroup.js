"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var DataGridTableColGroup = function (_a) {
    var panelColGroup = _a.panelColGroup;
    return (React.createElement("colgroup", null,
        panelColGroup.map(function (col, ci) { return (React.createElement("col", { key: ci, style: { width: col._width + 'px' } })); }),
        React.createElement("col", null)));
};
exports.default = DataGridTableColGroup;
//# sourceMappingURL=DataGridTableColGroup.js.map