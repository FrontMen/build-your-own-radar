import { Reducer } from 'redux';
import { TActions } from 'src/redux/types';
import { EFilterActionTypes } from 'src/redux/actions/filters';

export type TCompany = {
  [key in CompanyTypes]: boolean;
};

export interface IFiltersState {
  companies: TCompany;
  dataSet: {
    availableDates: string[];
    selected: string | null;
  }
}
const defaultState: IFiltersState = {
  companies: {
    ITR_BE: true,
    ITR_NL: true,
    FM: true,
  },
  dataSet: {
    availableDates: [],
    selected: null,
  }
};

export const filtersReducer: Reducer<IFiltersState, TActions> = (
  state = defaultState,
  action,
): IFiltersState => {
  switch (action.type) {
    case EFilterActionTypes.TOGGLE_COMPANY:
      return {
        ...state,
        companies: {
          ...state.companies,
          [action.payload]: !state.companies[action.payload],
        },
      };

    case EFilterActionTypes.SELECT_DATA_SET:
      return {
        ...state,
        dataSet: {
          ...state.dataSet,
          selected: action.payload,
        }
      };

    case EFilterActionTypes.FILL_DATA_SET_DATES:
      return {
        ...state,
        dataSet: {
          ...state.dataSet,
          availableDates: action.payload,
        }
      };

    default:
      return state;
  }
};
