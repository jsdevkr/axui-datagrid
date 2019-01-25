"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getPositionPrintColGroup_1 = require("./getPositionPrintColGroup");
const getTableByStartEndColumnIndex_1 = require("./getTableByStartEndColumnIndex");
function getVisibleColGroup(headerColGroup = [], { scrollLeft = 0, bodyRowData = { rows: [{ cols: [] }] }, footSumData = { rows: [{ cols: [] }] }, styles = {}, options = {}, }) {
    const { elWidth = 0, frozenPanelWidth: FPWidth = 0, asidePanelWidth: APWidth = 0, rightPanelWidth: RPWidth = 0, } = styles;
    const { frozenColumnIndex = 0 } = options;
    const { printStartColIndex, printEndColIndex } = getPositionPrintColGroup_1.default(headerColGroup, Math.abs(scrollLeft || 0) + FPWidth, Math.abs(scrollLeft || 0) +
        FPWidth +
        (elWidth - APWidth - FPWidth - RPWidth));
    const visibleHeaderColGroup = headerColGroup.slice(printStartColIndex, printEndColIndex + 1);
    const visibleBodyRowData = getTableByStartEndColumnIndex_1.default(bodyRowData, printStartColIndex + frozenColumnIndex, printEndColIndex + frozenColumnIndex);
    // const visibleBodyGroupingData = getTableByStartEndColumnIndex(
    //   storeState.bodyGroupingData,
    //   printStartColIndex + frozenColumnIndex,
    //   printEndColIndex + frozenColumnIndex,
    // ); todo : body grouping 구현후 주석을 풀자.
    const visibleFootSumData = getTableByStartEndColumnIndex_1.default(footSumData, printStartColIndex + frozenColumnIndex, printEndColIndex + frozenColumnIndex);
    return {
        visibleHeaderColGroup,
        visibleBodyRowData,
        visibleFootSumData,
        printStartColIndex,
        printEndColIndex,
    };
}
exports.default = getVisibleColGroup;
