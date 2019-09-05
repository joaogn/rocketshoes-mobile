import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
// eslint-disable-next-line import/no-cycle
import rootSaga from './modules/rootSaga';

import '../config/ReactotronConfig';

import { Product } from './modules/cart/types';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware(sagaMonitor);

const store = createStore(
  rootReducer,
  __DEV__
    ? compose(
        console.tron.createEnhancer(),
        applyMiddleware(sagaMiddleware)
      )
    : applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;

export interface ApplicationState {
  cart: Product[];
}
