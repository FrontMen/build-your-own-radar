import { ActionWithPayload } from 'redux/types';

export enum ED3ActionTypes {
  SET_BLIPS = 'd3/set-data-points',
}

type TSetBlips = ActionWithPayload<ED3ActionTypes.SET_BLIPS, Blip[]>;
const setBlips = (data: Blip[]): TSetBlips =>
  ({
    type: ED3ActionTypes.SET_BLIPS,
    payload: data,
  } as const);

export const d3Actions = {
  setBlips,
};
