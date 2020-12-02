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
import {
  authReducer,
  IAuthState,
  defaultState as defaultAuthState,
} from 'redux/reducers/auth';
import { TActions } from 'redux/types';
import {
  companiesReducer,
  ICompaniesState,
  defaultState as defaultCompaniesState,
} from './companies';

export interface IRootState {
  filters: IFiltersState;
  technologies: ITechnologiesState;
  companies: ICompaniesState;
  d3: ID3State;
  auth: IAuthState;
}

export const defaultRootState = {
  filters: defaultFiltersState,
  technologies: defaultTechnologiesState,
  companies: defaultCompaniesState,
  d3: defaultD3State,
  auth: defaultAuthState,
};

export const rootReducer: Reducer<IRootState, TActions> = combineReducers({
  filters: filtersReducer,
  technologies: technologiesReducer,
  companies: companiesReducer,
  d3: d3Reducer,
  auth: authReducer,
});
