"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
var token = /d{1,4}|E{1,4}|M{1,4}|yy(?:yy)?|([HhmsAa])\1?|[LloSzWN]|"[^"]*"|'[^']*'/g;
var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
var timezoneClip = /[^-+\dA-Z]/g;
function right(str, pos) {
    return str.substr(str.length - pos);
}
function localDate(yy, mm, dd, hh, mi, ss) {
    var _ud;
    if (mm < 0) {
        mm = 0;
    }
    if (typeof hh === 'undefined') {
        hh = 12;
    }
    if (typeof mi === 'undefined') {
        mi = 0;
    }
    _ud = new Date(Date.UTC(yy, mm, dd || 1, hh, mi, ss || 0));
    if (mm === 0 &&
        dd === 1 &&
        _ud.getUTCHours() + _ud.getTimezoneOffset() / 60 < 0) {
        _ud.setUTCHours(0);
    }
    else {
        _ud.setUTCHours(_ud.getUTCHours() + _ud.getTimezoneOffset() / 60);
    }
    return _ud;
}
function getWeek(date) {
    // https://github.com/felixge/node-dateformat
    var targetThursday, firstThursday, ds, weekDiff;
    // Remove time components of date
    targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    // Change date to Thursday same week
    targetThursday.setDate(targetThursday.getDate() - (targetThursday.getDay() + 6) % 7 + 3);
    // Take January 4th as it is always in week 1 (see ISO 8601)
    firstThursday = new Date(targetThursday.getFullYear(), 0, 4);
    // Change date to Thursday same week
    firstThursday.setDate(firstThursday.getDate() - (firstThursday.getDay() + 6) % 7 + 3);
    // Check if daylight-saving-time-switch occurred and correct for it
    ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
    targetThursday.setHours(targetThursday.getHours() - ds);
    // Number of weeks between target Thursday and first Thursday
    weekDiff =
        (targetThursday.getTime() - firstThursday.getTime()) / (86400000 * 7);
    return 1 + Math.floor(weekDiff);
}
function getDayOfWeek(date) {
    // https://github.com/felixge/node-dateformat
    var dow = date.getDay();
    if (dow === 0) {
        dow = 7;
    }
    return dow;
}
var PrintDate = /** @class */ (function () {
    // 기준일자
    function PrintDate() {
        this.currDate = new Date();
    }
    PrintDate.setI18n = function (i18n) {
        return (PrintDate.i18n = __assign({}, PrintDate.i18n, i18n));
    };
    PrintDate.prototype.setDate = function (date) {
        var currDate = new Date();
        var yy, mm, dd, hh, mi, ss, aDateTime, aTimes, aTime, aDate, va;
        var ISO_8601 = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i;
        var ISO_8601_FULL = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;
        if (typeof date === 'string') {
            if (date.length > 15) {
                if (ISO_8601_FULL.test(date) || ISO_8601.test(date)) {
                    currDate = new Date(date);
                }
                else {
                    aDateTime = date.split(/ /g);
                    aDate = aDateTime[0].split(/\D/g);
                    yy = Number(aDate[0]);
                    mm = Number(aDate[1]);
                    dd = Number(aDate[2]);
                    aTime = aDateTime[1] || '09:00:00';
                    aTimes = aTime.substring(0, 8).split(':');
                    hh = Number(aTimes[0]);
                    mi = Number(aTimes[1]);
                    ss = Number(aTimes[2]);
                    if (right(aTime, 2) === 'AM' || right(aTime, 2) === 'PM') {
                        hh += 12;
                    }
                    currDate = localDate(yy, mm - 1, dd, hh, mi, ss);
                }
            }
            else if (date.length === 14) {
                va = date.replace(/\D/g, '');
                currDate = localDate(Number(va.substr(0, 4)), Number(va.substr(4, 2)) - 1, Number(va.substr(6, 2)), Number(va.substr(8, 2)), Number(va.substr(10, 2)), Number(va.substr(12, 2)));
            }
            else if (date.length > 7) {
                va = date.replace(/\D/g, '');
                currDate = localDate(Number(va.substr(0, 4)), Number(va.substr(4, 2)) - 1, Number(va.substr(6, 2)));
            }
            else if (date.length > 4) {
                va = date.replace(/\D/g, '');
                currDate = localDate(Number(va.substr(0, 4)), Number(va.substr(4, 2)) - 1, 1);
            }
            else if (date.length > 2) {
                va = date.replace(/\D/g, '');
                currDate = localDate(Number(va.substr(0, 4)), Number(va.substr(4, 2)) - 1, 1);
            }
            else {
                currDate = new Date();
            }
        }
        else if (common_1.isDate(date)) {
            currDate = date;
        }
        this.currDate = currDate;
        return this;
    };
    PrintDate.prototype.print = function (format, utc, gmt) {
        if (typeof format === 'undefined') {
            return this.currDate;
        }
        var date = this.currDate;
        var _get = utc ? 'getUTC' : 'get';
        var formatSlice = format.slice(0, 4);
        if (formatSlice === 'UTC:' || formatSlice === 'GMT:') {
            format = format.slice(4);
            utc = true;
            gmt = formatSlice === 'GMT:';
        }
        var d = date[_get + 'Date']();
        var D = date[_get + 'Day']();
        var M = date[_get + 'Month']();
        var y = date[_get + 'FullYear']();
        var H = date[_get + 'Hours']();
        var m = date[_get + 'Minutes']();
        var s = date[_get + 'Seconds']();
        var L = date[_get + 'Milliseconds']();
        var o = utc ? 0 : date.getTimezoneOffset();
        var W = getWeek(date);
        var N = getDayOfWeek(date);
        var flags = {
            d: d,
            dd: common_1.padLeft(d),
            E: PrintDate.i18n.dayNames[D].substr(0, 1),
            EEE: PrintDate.i18n.dayNames[D],
            EEEE: PrintDate.i18n.dayNames[D + 7],
            M: M + 1,
            MM: common_1.padLeft(M + 1),
            MMM: PrintDate.i18n.monthNames[M],
            MMMM: PrintDate.i18n.monthNames[M + 12],
            yy: String(y).slice(2),
            yyyy: y,
            h: H % 12 || 12,
            hh: common_1.padLeft(H % 12 || 12),
            H: H,
            HH: common_1.padLeft(H),
            m: m,
            mm: common_1.padLeft(m),
            s: s,
            ss: common_1.padLeft(s),
            l: common_1.padLeft(L, 3),
            L: common_1.padLeft(Math.round(L / 10)),
            a: H < 12 ? PrintDate.i18n.timeNames[0] : PrintDate.i18n.timeNames[1],
            aa: H < 12 ? PrintDate.i18n.timeNames[2] : PrintDate.i18n.timeNames[3],
            A: H < 12 ? PrintDate.i18n.timeNames[4] : PrintDate.i18n.timeNames[5],
            AA: H < 12 ? PrintDate.i18n.timeNames[6] : PrintDate.i18n.timeNames[7],
            z: gmt
                ? 'GMT'
                : utc
                    ? 'UTC'
                    : ((String(date).match(timezone) || ['']).pop() || '').replace(timezoneClip, ''),
            o: (o > 0 ? '-' : '+') +
                common_1.padLeft(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
            S: ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : ((d % 100 - d % 10 !== 10 ? 1 : 0) * d) % 10],
            W: W,
            N: N,
        };
        return ('' + format).replace(token, function (match) {
            if (match in flags) {
                return flags[match];
            }
            return match.slice(1, match.length - 1);
        });
    };
    PrintDate.i18n = {
        dayNames: [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ],
        monthNames: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        timeNames: ['a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'],
    };
    return PrintDate;
}());
exports.PrintDate = PrintDate;
function printDate(d, format) {
    return new PrintDate().setDate(d).print(format);
}
exports.printDate = printDate;
