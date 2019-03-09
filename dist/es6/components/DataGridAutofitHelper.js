"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const hoc_1 = require("../hoc");
const CellLabel_1 = require("./CellLabel");
class DataGridAutofitHelper extends React.Component {
    constructor(props) {
        super(props);
        this.getColumnsWidth = () => {
            const { options = {} } = this.props;
            const { autofitColumnWidthMin = 0, autofitColumnWidthMax = 0 } = options;
            if (this.tableRef.current) {
                const colGroup = [];
                const tds = this.tableRef.current.querySelectorAll('[data-autofit-table-head-row] > td');
                if (tds && tds.length) {
                    for (let i = 0, l = tds.length; i < l; i++) {
                        const tdWidth = tds[i].getBoundingClientRect().width + 10;
                        let colWidth = tdWidth;
                        if (autofitColumnWidthMin > colWidth) {
                            colWidth = autofitColumnWidthMin;
                        }
                        else if (autofitColumnWidthMax < colWidth) {
                            colWidth = autofitColumnWidthMax;
                        }
                        colGroup[i] = {
                            colIndex: i,
                            width: i === 0 ? tdWidth + 10 : colWidth,
                            tdWidth: Math.min(tdWidth + 10, autofitColumnWidthMax + 100),
                        };
                    }
                }
                if (colGroup.length) {
                    this.props.applyAutofit({
                        asideWidth: colGroup[0].width,
                        colGroup: colGroup.slice(1),
                    });
                }
            }
        };
        this.tableRef = React.createRef();
    }
    render() {
        const { colGroup = [], data = [], predefinedFormatter = {}, styles = {}, } = this.props;
        const { bodyHeight = 0, bodyTrHeight = 1 } = styles;
        return (React.createElement("div", { className: 'axui-datagrid-autofit-helper' },
            React.createElement("table", { ref: this.tableRef },
                React.createElement("thead", null,
                    React.createElement("tr", { "data-autofit-table-head-row": true },
                        React.createElement("td", null, data.length + ''),
                        colGroup.map((col, ci) => (React.createElement("td", { key: ci }, col.label))))),
                React.createElement("tbody", null, data
                    .slice(0, Math.ceil(bodyHeight / (bodyTrHeight || 1)) + 1)
                    .map((row, li) => {
                    return (React.createElement("tr", { key: li },
                        React.createElement("td", null, li),
                        colGroup.map((col, ci) => {
                            const colEditor = col.editor === 'string'
                                ? { type: '' + col.editor }
                                : col.editor;
                            const inlineEditingActiveAlways = colEditor && colEditor.activeType === 'always';
                            return inlineEditingActiveAlways && colEditor.width ? (React.createElement("td", { key: ci },
                                React.createElement("div", { style: { width: colEditor.width } }))) : (React.createElement("td", { key: ci },
                                React.createElement(CellLabel_1.default, { columnHeight: 12, lineHeight: 12, columnBorderWidth: 0, colAlign: 'left', col: col, li: li, data: data, predefinedFormatter: predefinedFormatter })));
                        })));
                })))));
    }
    componentDidMount() {
        setTimeout(() => {
            this.getColumnsWidth();
        });
    }
}
exports.default = hoc_1.connectStore(DataGridAutofitHelper);
