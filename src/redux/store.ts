import { createStore, Store } from 'redux';
import { gridReducer, State } from './reducer';

export const store: Store<State> = createStore(
  gridReducer,
  window[ '__REDUX_DEVTOOLS_EXTENSION__' ] && window[ '__REDUX_DEVTOOLS_EXTENSION__' ]()
);