import { Saga } from 'redux-saga';
import { all, fork } from '@redux-saga/core/effects';
import { technologiesSaga } from './technologies';

const sagas: Saga[] = [technologiesSaga];

export function* rootSaga(): Generator {
  yield all(sagas.map(fork));
}
