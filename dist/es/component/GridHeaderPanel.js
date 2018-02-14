import * as React from 'react';
import { GridHeaderCell } from './GridHeaderCell';
export class GridHeaderPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { panelName, colGroup, bodyRow, style, optionsHeader, focusedCol, selectionCols, onClickHeader, sortInfo, onMouseDownColumnResizer } = this.props;
        return (React.createElement("div", { "data-panel": panelName, style: style },
            React.createElement("table", { style: { height: '100%' } },
                React.createElement("colgroup", null,
                    colGroup.map((col, ci) => React.createElement("col", { key: ci, style: { width: col._width + 'px' } })),
                    React.createElement("col", null)),
                React.createElement("tbody", null, bodyRow.rows.map((row, ri) => React.createElement("tr", { key: ri, className: '' },
                    row.cols.map((col, ci) => React.createElement(GridHeaderCell, { key: ci, bodyRow: bodyRow, optionsHeader: optionsHeader, focusedCol: focusedCol, selectionCols: selectionCols, onClickHeader: onClickHeader, sortInfo: sortInfo, ri: ri, col: col })),
                    React.createElement("td", null, "\u00A0"))))),
            (() => {
                if (panelName === 'aside-header')
                    return null;
                let resizerHeight = optionsHeader.columnHeight * bodyRow.rows.length - optionsHeader.columnBorderWidth;
                let resizer, resizerLeft = 0, resizerWidth = 4;
                return colGroup.map((col, ci) => {
                    if (col.colIndex !== null && typeof col.colIndex !== 'undefined') {
                        let prevResizerLeft = resizerLeft;
                        resizerLeft += col._width;
                        resizer = React.createElement("div", { key: ci, "data-column-resizer": col.colIndex, "data-prev-left": prevResizerLeft, "data-left": resizerLeft, style: { width: resizerWidth, height: resizerHeight + 'px', left: (resizerLeft - resizerWidth / 2) + 'px' }, onMouseDown: e => onMouseDownColumnResizer(e, col) });
                    }
                    return (resizer);
                });
            })()));
    }
}
