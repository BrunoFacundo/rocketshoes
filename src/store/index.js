import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const IS_DEV = process.env.NODE_ENV === 'development';

const sagaMonitor = IS_DEV ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({
    sagaMonitor
});

const enhancer = IS_DEV
    ? compose(
          console.tron.createEnhancer(),
          applyMiddleware(sagaMiddleware)
      )
    : applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
