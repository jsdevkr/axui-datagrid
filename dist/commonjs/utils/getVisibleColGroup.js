"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getPositionPrintColGroup_1 = require("./getPositionPrintColGroup");
var getTableByStartEndColumnIndex_1 = require("./getTableByStartEndColumnIndex");
function getVisibleColGroup(headerColGroup, _a) {
    if (headerColGroup === void 0) { headerColGroup = []; }
    var _b = _a.scrollLeft, scrollLeft = _b === void 0 ? 0 : _b, _c = _a.bodyRowData, bodyRowData = _c === void 0 ? { rows: [{ cols: [] }] } : _c, _d = _a.footSumData, footSumData = _d === void 0 ? { rows: [{ cols: [] }] } : _d, _e = _a.styles, styles = _e === void 0 ? {} : _e, _f = _a.options, options = _f === void 0 ? {} : _f;
    var _g = styles.elWidth, elWidth = _g === void 0 ? 0 : _g, _h = styles.frozenPanelWidth, FPWidth = _h === void 0 ? 0 : _h, _j = styles.asidePanelWidth, APWidth = _j === void 0 ? 0 : _j, _k = styles.rightPanelWidth, RPWidth = _k === void 0 ? 0 : _k;
    var _l = options.frozenColumnIndex, frozenColumnIndex = _l === void 0 ? 0 : _l;
    var _m = getPositionPrintColGroup_1.default(headerColGroup, Math.abs(scrollLeft || 0) + FPWidth, Math.abs(scrollLeft || 0) +
        FPWidth +
        (elWidth - APWidth - FPWidth - RPWidth)), printStartColIndex = _m.printStartColIndex, printEndColIndex = _m.printEndColIndex;
    var visibleHeaderColGroup = headerColGroup.slice(printStartColIndex, printEndColIndex + 1);
    var visibleBodyRowData = getTableByStartEndColumnIndex_1.default(bodyRowData, printStartColIndex + frozenColumnIndex, printEndColIndex + frozenColumnIndex);
    // const visibleBodyGroupingData = getTableByStartEndColumnIndex(
    //   storeState.bodyGroupingData,
    //   printStartColIndex + frozenColumnIndex,
    //   printEndColIndex + frozenColumnIndex,
    // ); todo : body grouping 구현후 주석을 풀자.
    var visibleFootSumData = getTableByStartEndColumnIndex_1.default(footSumData, printStartColIndex + frozenColumnIndex, printEndColIndex + frozenColumnIndex);
    return {
        visibleHeaderColGroup: visibleHeaderColGroup,
        visibleBodyRowData: visibleBodyRowData,
        visibleFootSumData: visibleFootSumData,
        printStartColIndex: printStartColIndex,
        printEndColIndex: printEndColIndex,
    };
}
exports.default = getVisibleColGroup;
