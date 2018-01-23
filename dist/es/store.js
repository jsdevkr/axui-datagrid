import { createStore } from 'redux';
import { gridReducer } from './reducers';
export const store = createStore(gridReducer, window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']());
