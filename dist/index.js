"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const store_1 = require("./redux/store");
const GridRoot_1 = require("./component/GridRoot");
const ACT = __importStar(require("./redux/actions"));
exports.GridConnected = react_redux_1.connect((state) => {
    return {
        store_receivedList: state.get('receivedList'),
        store_deletedList: state.get('deletedList'),
        store_list: state.get('list'),
        store_page: state.get('page'),
        store_sortInfo: state.get('sortInfo'),
        store_filterInfo: state.get('filterInfo'),
    };
}, (dispatch) => ({
    init: (props, options) => dispatch(ACT.INIT(props, options)),
    setData: (data, options) => dispatch(ACT.SET_DATA(data, options)),
    sort: (colGroup, options, colIndex) => dispatch(ACT.SORT(colGroup, options, colIndex)),
    filter: (colGroup, options, colIndex, filterInfo) => dispatch(ACT.FILTER(colGroup, options, colIndex, filterInfo)),
    update: (colGroup, options, row, col, value) => dispatch(ACT.UPDATE(colGroup, options, row, col, value)),
}))(GridRoot_1.GridRoot);
class AXDatagrid extends React.Component {
    static setFormatter(_formatter) {
        return GridRoot_1.GridRoot.setFormatter(_formatter);
    }
    static getFormatter() {
        return GridRoot_1.GridRoot.getFormatter();
    }
    render() {
        return (React.createElement(react_redux_1.Provider, { store: store_1.store },
            React.createElement(exports.GridConnected, Object.assign({}, this.props))));
    }
}
exports.AXDatagrid = AXDatagrid;
