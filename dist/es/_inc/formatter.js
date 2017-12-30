"use strict";
exports.__esModule = true;
var utils_1 = require("./utils");
/**
 *
 * @param {iFormatterData} data
 * @return {string}
 */
function money(data) {
    if (typeof data.value !== 'undefined') {
        var val = ('' + data.value).replace(/[^0-9^\.^\-]/g, ''), regExpPattern = new RegExp('([0-9])([0-9][0-9][0-9][,.])'), arrNumber = val.split('.');
        arrNumber[0] += '.';
        do {
            arrNumber[0] = arrNumber[0].replace(regExpPattern, '$1,$2');
        } while (regExpPattern.test(arrNumber[0]));
        return (arrNumber.length > 1) ? arrNumber[0] + arrNumber[1].substr(0, 2) : arrNumber[0].split('.')[0];
    }
    else {
        return '';
    }
}
exports.money = money;
/**
 *
 * @param {iFormatterData} data
 * @return {string}
 */
function date(data) {
    return utils_1.cdate(data.value, { 'return': 'yyyy-MM-dd' });
}
exports.date = date;
/**
 *
 * @param {iFormatterData} data
 * @return {string}
 */
function datetime(data) {
    return utils_1.cdate(data.value, { 'return': 'yyyy-MM-dd hh:mm:ss' });
}
exports.datetime = datetime;
/**
 *
 */
function getAll() {
    return {
        money: money, date: date
    };
}
exports.getAll = getAll;
