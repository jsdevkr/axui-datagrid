"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const print_date_1 = require("print-date");
/**
 *
 * @param {iFormatterData} data
 * @return {string}
 */
function money(data) {
    if (typeof data.value !== 'undefined') {
        let val = ('' + data.value).replace(/[^0-9^\.^\-]/g, ''), regExpPattern = new RegExp('([0-9])([0-9][0-9][0-9][,.])'), arrNumber = val.split('.');
        arrNumber[0] += '.';
        do {
            arrNumber[0] = arrNumber[0].replace(regExpPattern, '$1,$2');
        } while (regExpPattern.test(arrNumber[0]));
        return arrNumber.length > 1
            ? arrNumber[0] + arrNumber[1].substr(0, 2)
            : arrNumber[0].split('.')[0];
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
    return print_date_1.printDate(data.value, 'yyyy-MM-dd');
}
exports.date = date;
/**
 *
 * @param {iFormatterData} data
 * @return {string}
 */
function datetime(data) {
    return print_date_1.printDate(data.value, 'yyyy-MM-dd hh:mm:ss');
}
exports.datetime = datetime;
/**
 *
 */
function getAll() {
    return {
        money,
        date,
        datetime,
    };
}
exports.getAll = getAll;
