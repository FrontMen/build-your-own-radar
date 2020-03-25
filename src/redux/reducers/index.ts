import { Reducer, combineReducers } from 'redux';
import { filtersReducer, IFiltersState } from 'redux/reducers/filters';
import {
  technologiesReducer,
  ITechnologiesState,
} from 'redux/reducers/technologies';
import { TActions } from 'redux/types';

export interface IRootState {
  filters: IFiltersState;
  technologies: ITechnologiesState;
}

export const rootReducer: Reducer<IRootState, TActions> = combineReducers({
  filters: filtersReducer,
  technologies: technologiesReducer,
});
