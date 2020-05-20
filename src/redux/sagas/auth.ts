import { EAuthActionTypes } from 'redux/actions/auth';
import { call, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/API';
import { auth } from 'utils/auth';

export function* fetchTokenSaga(action: any) {
  try {
    const { params, search } = action.payload;
    const requestURL = `${process.env.REACT_APP_BACKEND_URL}/auth/${params.provider}/callback?${search}`;
    const response = yield call(request, requestURL, { method: 'GET' });
    const { jwt } = response;

    if (jwt) {
      yield call(auth.setToken, jwt);
    }

    // We could find better than this work around
    document.location.href = '/';
  } catch (error) {
    console.error(error);
  }
}

export function* authSaga() {
  yield takeLatest(EAuthActionTypes.FETCH_TOKEN, fetchTokenSaga);
}
