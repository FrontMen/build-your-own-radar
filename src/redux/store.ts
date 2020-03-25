import {
  Reducer,
  Store,
  applyMiddleware,
  compose,
  createStore as createReduxStore,
} from 'redux';
import createSagaMiddleware, { Saga } from 'redux-saga';
import { IRootState, rootReducer } from 'src/redux/reducers';
import { TActions } from 'src/redux/types';
import { rootSaga } from 'src/redux/sagas';

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middlewares = applyMiddleware(sagaMiddleware);

const createStore = (
  rootReducer: Reducer<IRootState, TActions>,
  rootSaga: Saga,
): Store<IRootState, TActions> => {
  const store = createReduxStore(rootReducer, composeEnhancers(middlewares));

  sagaMiddleware.run(rootSaga);

  return store;
};

export const store = createStore(rootReducer, rootSaga);
