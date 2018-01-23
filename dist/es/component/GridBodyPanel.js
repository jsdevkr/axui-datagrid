import * as React from 'react';
import { Range } from 'immutable';
import { E_NAME, KEY_CODE } from '../_inc/constant';
import { GridBodyCell } from './GridBodyCell';
export class GridBodyPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onEditInput = this.onEditInput.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        let sameProps = false;
        if (this.props.options !== nextProps.options ||
            this.props.colGroup !== nextProps.colGroup ||
            this.props.list !== nextProps.list ||
            this.props.selectionRows !== nextProps.selectionRows ||
            this.props.selectionCols !== nextProps.selectionCols ||
            this.props.focusedRow !== nextProps.focusedRow ||
            this.props.focusedCol !== nextProps.focusedCol ||
            this.props.panelLeft !== nextProps.panelLeft ||
            this.props.panelTop !== nextProps.panelTop ||
            this.props.isInlineEditing !== nextProps.isInlineEditing ||
            this.props.inlineEditingCell !== nextProps.inlineEditingCell) {
            sameProps = true;
        }
        return sameProps;
    }
    onEditInput(E_TYPE, e) {
        const { updateEditInput, inlineEditingCell } = this.props;
        const proc = {
            [E_NAME.BLUR]: () => {
                updateEditInput('cancel');
            },
            [E_NAME.KEY_DOWN]: () => {
                if (e.which === KEY_CODE.ESC) {
                    updateEditInput('cancel');
                }
                else if (e.which === KEY_CODE.RETURN) {
                    updateEditInput('update', inlineEditingCell.row, inlineEditingCell.col, e.target.value);
                }
            }
        };
        proc[E_TYPE]();
    }
    render() {
        const { styles, options, colGroup, selectionRows, selectionCols, focusedRow, focusedCol, columnFormatter, onDoubleClickCell, isInlineEditing, inlineEditingCell, list, panelBodyRow, panelColGroup, panelGroupRow, panelName, panelScrollConfig, panelLeft = 0, panelTop = 0, panelPaddingLeft = 0 } = this.props;
        let panelStyle = {
            left: panelLeft,
            top: panelTop,
            paddingTop: panelScrollConfig.sRowIndex * styles.bodyTrHeight,
            paddingLeft: 0
        };
        if (panelPaddingLeft) {
            panelStyle.paddingLeft = panelPaddingLeft;
        }
        return (React.createElement("div", { "data-panel": panelName, style: panelStyle },
            React.createElement("table", { style: { height: '100%' } },
                React.createElement("colgroup", null,
                    panelColGroup.map((col, ci) => (React.createElement("col", { key: ci, style: { width: col._width + 'px' } }))),
                    React.createElement("col", null)),
                React.createElement("tbody", null, Range(panelScrollConfig.sRowIndex, panelScrollConfig.eRowIndex).map((li) => {
                    const item = list.get(li);
                    if (item) {
                        return (panelBodyRow.rows.map((row, ri) => {
                            return (React.createElement("tr", { key: ri },
                                row.cols.map((col, ci) => {
                                    return React.createElement(GridBodyCell, { key: ci, columnHeight: options.body.columnHeight, columnPadding: options.body.columnPadding, columnBorderWidth: options.body.columnBorderWidth, bodyAlign: options.body.align, focusedRow: focusedRow, focusedCol: focusedCol, selectionRows: selectionRows, selectionCols: selectionCols, columnFormatter: columnFormatter, isInlineEditing: isInlineEditing, inlineEditingCell: inlineEditingCell, list: list, li: li, colGroup: colGroup, col: col, ci: ci, value: item[col.key], onEditInput: this.onEditInput, onDoubleClickCell: onDoubleClickCell });
                                }),
                                React.createElement("td", null, "\u00A0")));
                        }));
                    }
                })))));
    }
}
