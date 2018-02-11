import { createStore } from 'redux';
import { gridReducer } from './redux/reducer';
export const store = createStore(gridReducer, window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']());
