import {
  ETechnologiesActionTypes,
  technologiesActions,
} from 'redux/actions/technologies';
import { filtersActions } from 'redux/actions/filters';
import { call, put, takeLatest } from 'redux-saga/effects';
import { parseGoogleSheetsApiResponse } from 'utils/dataParser';

import { isErrorResponse, fetchSpreadSheet } from 'utils/API';

export const getGoogleSheetsData = async () => {
  const response = await fetchSpreadSheet();
  const data = await response.json();

  if (isErrorResponse(response)) {
    throw data.error;
  }

  return data;
};

export function* fetchTechnologiesSaga() {
  try {
    const data: IncomingGoogleSheetsData = yield call(getGoogleSheetsData);
    const parsedData = parseGoogleSheetsApiResponse(data);

    yield put(technologiesActions.fetchTechnologiesSuccess(parsedData));

    const dates = Object.keys(parsedData).sort(
      (a, b) => Date.parse(b) - Date.parse(a),
    );

    yield put(filtersActions.selectDataSet(dates[0]));
    yield put(filtersActions.fillDataSetDates(dates));
  } catch (error) {
    yield put(technologiesActions.fetchTechnologiesError(error));
  }
}

export function* technologiesSaga() {
  yield takeLatest(
    ETechnologiesActionTypes.FETCH_TECHNOLOGIES,
    fetchTechnologiesSaga,
  );
}
