import { Reducer, combineReducers } from 'redux';
import {
  filtersReducer,
  IFiltersState,
  defaultState as defaultFiltersState,
} from 'redux/reducers/filters';
import {
  technologiesReducer,
  ITechnologiesState,
  defaultState as defaultTechnologiesState,
} from 'redux/reducers/technologies';
import {
  d3Reducer,
  ID3State,
  defaultState as defaultD3State,
} from 'redux/reducers/d3';
import { TActions } from 'redux/types';

export interface IRootState {
  filters: IFiltersState;
  technologies: ITechnologiesState;
  d3: ID3State;
}

export const defaultRootState = {
  filters: defaultFiltersState,
  technologies: defaultTechnologiesState,
  d3: defaultD3State,
};

export const rootReducer: Reducer<IRootState, TActions> = combineReducers({
  filters: filtersReducer,
  technologies: technologiesReducer,
  d3: d3Reducer,
});
