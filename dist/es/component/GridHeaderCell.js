import * as React from 'react';
import cx from 'classnames';
export class GridHeaderCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { bodyRow, optionsHeader, focusedCol, selectionCols, sortInfo, ri, col, onClickHeader } = this.props;
        let lineHeight = (optionsHeader.columnHeight - optionsHeader.columnPadding * 2 - optionsHeader.columnBorderWidth);
        let colAlign = optionsHeader.align || col.align;
        let label, sorter, filter;
        if (col.key === '__checkbox_header__') {
            if (optionsHeader.selector) {
                label = React.createElement("div", { "data-checkbox": true, style: {
                        maxHeight: (col.width - 10) + 'px',
                        minHeight: (col.width - 10) + 'px'
                    } });
            }
        }
        else {
            label = col.label;
        }
        if (col.key && col.colIndex !== null && typeof col.colIndex !== 'undefined' && sortInfo[col.key]) {
            sorter = React.createElement("span", { "data-sorter": col.colIndex, "data-sorter-order": sortInfo[col.key].orderBy });
        }
        let cellHeight = optionsHeader.columnHeight * col.rowspan - optionsHeader.columnBorderWidth;
        let tdClassNames = {
            ['axd-header-column']: true,
            ['axd-header-corner']: (col.columnAttr === 'lineNumber'),
            ['focused']: (focusedCol > -1 && col.colIndex === focusedCol && bodyRow.rows.length - 1 === ri + col.rowspan - 1),
            ['selected']: (selectionCols[col.colIndex] && bodyRow.rows.length - 1 === ri + col.rowspan - 1)
        };
        return (React.createElement("td", { colSpan: col.colspan, rowSpan: col.rowspan, className: cx(tdClassNames), onClick: (e) => onClickHeader(e, col.colIndex, col.columnAttr), style: { height: cellHeight, minHeight: '1px' } },
            React.createElement("span", { "data-span": true, "data-align": colAlign, style: {
                    height: (optionsHeader.columnHeight - optionsHeader.columnBorderWidth) + 'px',
                    lineHeight: lineHeight + 'px'
                } },
                sorter,
                label || ' '),
            (optionsHeader.enableFilter && col.key && col.colIndex > -1) ? React.createElement("span", { "data-filter": 'true', "data-filter-index": col.colIndex }) : null));
    }
}
