import { EAuthActionTypes, authActions } from 'redux/actions/auth';
import { call, takeLatest, put } from 'redux-saga/effects';
import { request } from 'utils/API';
import { auth } from 'utils/auth';

export function* fetchTokenSaga(action: any) {
  try {
    const { params, search } = action.payload;
    const requestURL = `${process.env.REACT_APP_BACKEND_URL}/auth/${params.provider}/callback?${search}`;
    const response = yield call(request, requestURL, { method: 'GET' });

    const { jwt, statusCode } = response;
    if (statusCode === 403) {
      yield put(
        authActions.setAuthStatus({
          error: 'forbidden',
          authorized: false,
          user: null,
        }),
      );
    }

    if (jwt) {
      yield call(auth.setToken, jwt);
      yield put(
        authActions.setAuthStatus({
          authorized: true,
          user: {},
        }),
      );
    }
  } catch (error) {
    console.error(error);
  }
}

export function* authSaga() {
  yield takeLatest(EAuthActionTypes.FETCH_TOKEN, fetchTokenSaga);
}
