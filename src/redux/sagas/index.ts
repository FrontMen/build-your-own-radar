import { Saga } from 'redux-saga';
import { all, fork } from '@redux-saga/core/effects';
import { technologiesSaga } from './technologies';
import { d3Saga } from './d3';
import { authSaga } from './auth';

const sagas: Saga[] = [technologiesSaga, d3Saga, authSaga];

export function* rootSaga(): Generator {
  yield all(sagas.map(fork));
}
