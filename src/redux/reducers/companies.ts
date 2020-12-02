import { Reducer } from 'redux';
import { TActions } from 'redux/types';
import { ECompaniesActionTypes } from 'redux/actions/companies';

export interface ICompaniesState {
  data: Company[];
  initialized: boolean;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}
export const defaultState: ICompaniesState = {
  data: [],
  initialized: false,
  loading: false,
  error: false,
  errorMessage: '',
};

export const companiesReducer: Reducer<ICompaniesState, TActions> = (
  state = defaultState,
  action,
): ICompaniesState => {
  switch (action.type) {
    case ECompaniesActionTypes.FETCH_COMPANIES: {
      return {
        ...state,
        initialized: true,
        loading: true,
      };
    }

    case ECompaniesActionTypes.FETCH_COMPANIES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
        errorMessage: '',
      };

    case ECompaniesActionTypes.FETCH_COMPANIES_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error.message,
      };

    default:
      return state;
  }
};
