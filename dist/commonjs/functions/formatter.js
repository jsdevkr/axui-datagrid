"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("../utils");
function money(formatterData) {
    if (typeof formatterData.value !== 'undefined') {
        var dotIndex = ('' + formatterData.value).indexOf('.');
        return utils_1.formatCurrency(formatterData.value, dotIndex > 0 ? ('' + formatterData.value).length - 1 - dotIndex : 0);
    }
    else {
        return '';
    }
}
function date(formatterData) {
    if (typeof formatterData.value !== 'undefined') {
        return utils_1.printDate(formatterData.value, 'yyyy-MM-dd');
    }
    else {
        return '';
    }
}
function datetime(formatterData) {
    if (typeof formatterData.value !== 'undefined') {
        return utils_1.printDate(formatterData.value, 'yyyy-MM-dd hh:mm:ss');
    }
    else {
        return '';
    }
}
function html(formatterData) {
    if (typeof formatterData.value !== 'undefined') {
        return (React.createElement("span", { dangerouslySetInnerHTML: (function () { return ({
                __html: formatterData.value,
            }); })() }));
    }
    else {
        return '';
    }
}
exports.default = { money: money, date: date, datetime: datetime, html: html };
