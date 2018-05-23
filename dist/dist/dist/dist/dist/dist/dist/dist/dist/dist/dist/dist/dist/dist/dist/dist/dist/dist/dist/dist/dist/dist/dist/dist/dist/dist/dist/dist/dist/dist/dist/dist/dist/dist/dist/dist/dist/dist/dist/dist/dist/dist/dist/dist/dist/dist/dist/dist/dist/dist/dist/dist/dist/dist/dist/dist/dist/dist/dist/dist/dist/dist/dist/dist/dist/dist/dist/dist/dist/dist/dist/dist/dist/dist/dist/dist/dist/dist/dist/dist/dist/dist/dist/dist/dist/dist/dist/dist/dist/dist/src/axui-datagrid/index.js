"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var store_1 = require("./redux/store");
var GridRoot_1 = require("./component/GridRoot");
var ACT = require("./redux/actions");
exports.GridConnected = react_redux_1.connect(function (state) {
    return {
        store_receivedList: state.get('receivedList'),
        store_deletedList: state.get('deletedList'),
        store_list: state.get('list'),
        store_page: state.get('page'),
        store_sortInfo: state.get('sortInfo'),
        store_filterInfo: state.get('filterInfo'),
    };
}, function (dispatch) {
    return ({
        init: function (props, options) { return dispatch(ACT.INIT(props, options)); },
        setData: function (data, options) { return dispatch(ACT.SET_DATA(data, options)); },
        sort: function (colGroup, options, colIndex) {
            return dispatch(ACT.SORT(colGroup, options, colIndex));
        },
        filter: function (colGroup, options, colIndex, filterInfo) {
            return dispatch(ACT.FILTER(colGroup, options, colIndex, filterInfo));
        },
        update: function (colGroup, options, row, col, value) {
            return dispatch(ACT.UPDATE(colGroup, options, row, col, value));
        },
    });
})(GridRoot_1.GridRoot);
var AXDatagrid = /** @class */ (function (_super) {
    __extends(AXDatagrid, _super);
    function AXDatagrid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AXDatagrid.setFormatter = function (_formatter) {
        return GridRoot_1.GridRoot.setFormatter(_formatter);
    };
    AXDatagrid.getFormatter = function () {
        return GridRoot_1.GridRoot.getFormatter();
    };
    AXDatagrid.prototype.render = function () {
        return (React.createElement(react_redux_1.Provider, { store: store_1.store }, React.createElement(exports.GridConnected, __assign({}, this.props))));
    };
    return AXDatagrid;
}(React.Component));
exports.AXDatagrid = AXDatagrid;
//# sourceMappingURL=index.js.map