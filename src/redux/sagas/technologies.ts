import {
  ETechnologiesActionTypes,
  technologiesActions,
} from 'redux/actions/technologies';
import { filtersActions } from 'redux/actions/filters';
import { call, put, takeLatest } from 'redux-saga/effects';
import { parseGoogleSheetsApiResponse } from 'utils/dataParser';
import { client } from 'utils/apolloClient';
import { TECHNOLOGIES_QUERY } from 'gql/queries/technologies';
import { QUADRANTS_QUERY } from 'gql/queries/quadrants';
import Groupby from 'lodash.groupby';

const getTechnologyData = async () => {
  const { data } = await client.query({
    query: TECHNOLOGIES_QUERY,
  });

  return data.technologies;
};

const getQuadrantsData = async () => {
  const { data } = await client.query({
    query: QUADRANTS_QUERY,
  });

  return data.quadrants.sort((a: Quadrant, b: Quadrant) => a.order - b.order);
};

export function* fetchTechnologiesSaga() {
  try {
    const data = yield call(getTechnologyData);
    const quadrants = yield call(getQuadrantsData);
    const groupedData = Groupby(data, 'publishedAt');

    yield put(technologiesActions.fetchTechnologiesSuccess(groupedData));
    yield put(filtersActions.fillQuandrants(quadrants));

    const dates = Object.keys(groupedData).sort(
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
