import * as React from 'react';
import { connect, Provider } from 'react-redux';
import { store } from './store';
import { GridRoot } from './GridRoot';
import * as ACT from './_inc/actions';
export const GridRootConnected = connect((state) => {
    return {
        store_receivedList: state.get('receivedList'),
        store_deletedList: state.get('deletedList'),
        store_list: state.get('list'),
        store_page: state.get('page'),
        store_sortInfo: state.get('sortInfo'),
        store_filterInfo: state.get('filterInfo')
    };
}, (dispatch) => ({
    init: (props, options) => dispatch(ACT.INIT(props, options)),
    setData: (data, options) => dispatch(ACT.SET_DATA(data, options)),
    sort: (colGroup, options, colIndex) => dispatch(ACT.SORT(colGroup, options, colIndex)),
    filter: (colGroup, options, colIndex, filterInfo) => dispatch(ACT.FILTER(colGroup, options, colIndex, filterInfo)),
    update: (colGroup, options, row, col, value) => dispatch(ACT.UPDATE(colGroup, options, row, col, value))
}))(GridRoot);
export class AXDatagrid extends React.Component {
    static setFormatter(_formatter) {
        return GridRoot.setFormatter(_formatter);
    }
    static getFormatter() {
        return GridRoot.getFormatter();
    }
    render() {
        return (React.createElement(Provider, { store: store },
            React.createElement(GridRootConnected, Object.assign({}, this.props))));
    }
}
