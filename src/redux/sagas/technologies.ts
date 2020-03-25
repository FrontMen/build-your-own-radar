import {
  ETechnologiesActionTypes,
  technologiesActions,
} from 'src/redux/actions/technologies';
import { filtersActions } from 'src/redux/actions/filters';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  parseGoogleSheetsApiResponse,
} from 'src/utils/dataParser';

import { isErrorResponse, fetchSpreadSheet } from 'src/utils/API';

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
      (a, b) => Date.parse(a) - Date.parse(b),
    );

    yield put(filtersActions.selectDataSet(dates[dates.length - 1]));
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
