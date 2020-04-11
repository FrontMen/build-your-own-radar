import { put, takeLatest, select, take, all } from 'redux-saga/effects';
import {
  ETechnologiesActionTypes,
  TFetchTechnologiesSuccess,
} from 'redux/actions/technologies';
import { EFilterActionTypes } from 'redux/actions/filters';
import { d3Actions } from 'redux/actions/d3';

import { d3Config } from 'utils/d3-config';
import { segment } from 'utils/d3';
import { blipsSelector, changedTechnologiesSelector } from 'redux/selectors/d3';

export function* configureBlipsSaga(action: TFetchTechnologiesSuccess) {
  const parsedData = action.payload;
  const blips = Object.values(parsedData)
    .flat()
    .reduce(
      (
        acc: { [key: string]: Blip },
        { quadrant, id, positionId, name, ring, isNew },
      ) => {
        // position each entry randomly in its segment
        const quadNum = quadrant;
        const ringNum = d3Config.rings[ring].num;
        const blipSegment = segment(quadNum, ringNum);
        const { x, y } = blipSegment.random();
        acc[name] = {
          x,
          y,
          vx: 0,
          vy: 0,
          quadrant: quadrant,
          id: id,
          isNew: isNew,
          positionId: positionId,
          name: name,
          ring: ring,
          segment: blipSegment,
          color: d3Config.quadrants[quadNum].color,
        };

        return acc;
      },
      {},
    );

  yield put(d3Actions.setBlips(Object.values(blips)));
}

function* watchChangesSaga() {
  while (true) {
    yield take(EFilterActionTypes.SELECT_DATA_SET);
    const changed: Technology[] = yield select(changedTechnologiesSelector);
    const blips: Blip[] = yield select(blipsSelector());

    if (changed.length > 0) {
      const updated = blips.map(blip => {
        const matchingTechnology = changed.find(
          technology => technology.name === blip.name,
        );
        if (matchingTechnology) {
          const quadNum = matchingTechnology.quadrant;
          const newRingNum = d3Config.rings[matchingTechnology.ring].num;
          const blipSegment = segment(quadNum, newRingNum);
          const { x, y } = blipSegment.random();
          return {
            ...blip,
            x,
            y,
            isNew: matchingTechnology.isNew,
            ring: matchingTechnology.ring,
            segment: blipSegment,
            color: d3Config.quadrants[quadNum].color,
          };
        }
        return blip;
      });

      yield put(d3Actions.setBlips(updated));
    }
  }
}

export function* d3Saga() {
  yield all([
    takeLatest(
      ETechnologiesActionTypes.FETCH_TECHNOLOGIES_SUCCESS,
      configureBlipsSaga,
    ),
    watchChangesSaga(),
  ]);
}
