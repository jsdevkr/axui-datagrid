import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import GridContainer from './component/GridContainer';

interface IProps {
    gridCSS: object,
    height: string,
    style: object,
    columns: Array<object>,
    data: Array<object>,
    options: object,
    thisCallback: object
}

export class AXDataGrid extends React.Component<IProps, {}> {
    render() {
        return (
            <Provider store={store}>
                <GridContainer {...this.props} />
            </Provider>
        );
    }
}