"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const DataGridTableColGroup = ({ panelColGroup }) => (React.createElement("colgroup", null,
    panelColGroup.map((col, ci) => (React.createElement("col", { key: ci, style: { width: col._width + 'px' } }))),
    React.createElement("col", null)));
exports.default = DataGridTableColGroup;
