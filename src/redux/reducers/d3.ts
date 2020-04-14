import { Reducer } from 'redux';
import { TActions } from 'redux/types';
import { ED3ActionTypes } from 'redux/actions/d3';

export interface ID3State {
  blips: Blip[];
}

export const defaultState: ID3State = {
  blips: [],
};

export const d3Reducer: Reducer<ID3State, TActions> = (
  state = defaultState,
  action,
): ID3State => {
  if (action.type === ED3ActionTypes.SET_BLIPS) {
    return {
      blips: action.payload,
    };
  }
  return state;
};
