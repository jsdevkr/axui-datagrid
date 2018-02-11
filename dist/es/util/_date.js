import isNumber from 'lodash-es/isNumber';
import isString from 'lodash-es/isString';
let WEEKNAMES = [
    { label: 'SUN' },
    { label: 'MON' },
    { label: 'TUE' },
    { label: 'WED' },
    { label: 'THU' },
    { label: 'FRI' },
    { label: 'SAT' }
];
function times(s, count) {
    return count < 1 ? '' : new Array(count + 1).join(s);
}
function setDigit(num, length, padder, radix) {
    let s = num.toString(radix || 10);
    return times((padder || '0'), (length - s.length)) + s;
}
function right(str, pos) {
    if (typeof str === 'undefined' || typeof pos === 'undefined')
        return '';
    str = '' + str;
    if (isString(pos)) {
        return (str.lastIndexOf(pos) > -1) ? str.substr(str.lastIndexOf(pos) + 1) : '';
    }
    else if (isNumber(pos)) {
        return str.substr(str.length - pos);
    }
    else {
        return '';
    }
}
export function localDate(yy, mm, dd, hh, mi, ss) {
    let utcD;
    if (mm < 0)
        mm = 0;
    if (typeof hh === 'undefined')
        hh = 12;
    if (typeof mi === 'undefined')
        mi = 0;
    utcD = new Date(Date.UTC(yy, mm, dd || 1, hh, mi, ss || 0));
    if (mm == 0 && dd == 1 && utcD.getUTCHours() + (utcD.getTimezoneOffset() / 60) < 0) {
        utcD.setUTCHours(0);
    }
    else {
        utcD.setUTCHours(utcD.getUTCHours() + (utcD.getTimezoneOffset() / 60));
    }
    return utcD;
}
export function cdate(d, cond) {
    let yy, mm, dd, hh, mi, aDateTime, aTimes, aTime, aDate, va, ISO_8601 = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i, ISO_8601_FULL = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;
    if (isString(d)) {
        if (d.length === 0) {
            d = new Date();
        }
        else if (d.length > 15) {
            if (ISO_8601_FULL.test(d) || ISO_8601.test(d)) {
                d = new Date(d);
            }
            else {
                aDateTime = d.split(/ /g), aTimes, aTime,
                    aDate = aDateTime[0].split(/\D/g),
                    yy = aDate[0];
                mm = parseFloat(aDate[1]);
                dd = parseFloat(aDate[2]);
                aTime = aDateTime[1] || '09:00';
                aTimes = aTime.substring(0, 5).split(':');
                hh = parseFloat(aTimes[0]);
                mi = parseFloat(aTimes[1]);
                if (right(aTime, 2) === 'AM' || right(aTime, 2) === 'PM')
                    hh += 12;
                d = localDate(yy, mm - 1, dd, hh, mi);
            }
        }
        else if (d.length == 14) {
            va = d.replace(/\D/g, '');
            d = localDate(va.substr(0, 4), va.substr(4, 2) - 1, parseFloat(va.substr(6, 2)), parseFloat(va.substr(8, 2)), parseFloat(va.substr(10, 2)), parseFloat(va.substr(12, 2)));
        }
        else if (d.length > 7) {
            va = d.replace(/\D/g, '');
            d = localDate(va.substr(0, 4), va.substr(4, 2) - 1, parseFloat(va.substr(6, 2)));
        }
        else if (d.length > 4) {
            va = d.replace(/\D/g, '');
            d = localDate(va.substr(0, 4), va.substr(4, 2) - 1, 1);
        }
        else if (d.length > 2) {
            va = d.replace(/\D/g, '');
            d = localDate(va.substr(0, 4), va.substr(4, 2) - 1, 1);
        }
        else {
            d = new Date();
        }
    }
    if (typeof cond === 'undefined' || typeof d === 'undefined') {
        return d;
    }
    else {
        if ('return' in cond) {
            return (function () {
                let fStr = cond['return'], nY, nM, nD, nH, nMM, nS, nDW, yre, regY, mre, regM, dre, regD, hre, regH, mire, regMI, sre, regS, dwre, regDW;
                nY = d.getUTCFullYear();
                nM = setDigit(d.getMonth() + 1, 2);
                nD = setDigit(d.getDate(), 2);
                nH = setDigit(d.getHours(), 2);
                nMM = setDigit(d.getMinutes(), 2);
                nS = setDigit(d.getSeconds(), 2);
                nDW = d.getDay();
                yre = /[^y]*(yyyy)[^y]*/gi;
                yre.exec(fStr);
                regY = RegExp.$1;
                mre = /[^m]*(MM)[^m]*/g;
                mre.exec(fStr);
                regM = RegExp.$1;
                dre = /[^d]*(dd)[^d]*/gi;
                dre.exec(fStr);
                regD = RegExp.$1;
                hre = /[^h]*(hh)[^h]*/gi;
                hre.exec(fStr);
                regH = RegExp.$1;
                mire = /[^m]*(mm)[^i]*/g;
                mire.exec(fStr);
                regMI = RegExp.$1;
                sre = /[^s]*(ss)[^s]*/gi;
                sre.exec(fStr);
                regS = RegExp.$1;
                dwre = /[^d]*(dw)[^w]*/gi;
                dwre.exec(fStr);
                regDW = RegExp.$1;
                if (regY === 'yyyy') {
                    fStr = fStr.replace(regY, right(nY, regY.length));
                }
                if (regM === 'MM') {
                    if (regM.length == 1)
                        nM = (d.getMonth() + 1);
                    fStr = fStr.replace(regM, nM);
                }
                if (regD === 'dd') {
                    if (regD.length == 1)
                        nD = d.getDate();
                    fStr = fStr.replace(regD, nD);
                }
                if (regH === 'hh') {
                    fStr = fStr.replace(regH, nH);
                }
                if (regMI === 'mm') {
                    fStr = fStr.replace(regMI, nMM);
                }
                if (regS === 'ss') {
                    fStr = fStr.replace(regS, nS);
                }
                if (regDW == 'dw') {
                    fStr = fStr.replace(regDW, WEEKNAMES[nDW].label);
                }
                return fStr;
            })();
        }
        else {
            return d;
        }
    }
}
