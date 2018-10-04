"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPositionPrintColGroup(_headerColGroup, sx, ex) {
    var printStartColIndex = 0, printEndColIndex = _headerColGroup.length - 1;
    for (var ci = 0, cl = _headerColGroup.length; ci < cl; ci++) {
        if (_headerColGroup[ci]._sx <= sx &&
            _headerColGroup[ci]._ex >= sx) {
            printStartColIndex = ci;
        }
        if (_headerColGroup[ci]._sx <= ex &&
            _headerColGroup[ci]._ex >= ex) {
            printEndColIndex = ci;
            break;
        }
    }
    return { printStartColIndex: printStartColIndex, printEndColIndex: printEndColIndex };
}
exports.default = getPositionPrintColGroup;
