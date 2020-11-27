import { Reducer } from 'redux';
import { TActions } from 'redux/types';
import { EFilterActionTypes } from 'redux/actions/filters';

type TCompany = {
  [key in CompanyTypes]: boolean;
};

export interface IFiltersState {
  companies: TCompany;
  dataSet: {
    availableDates: string[];
    selected: string | null;
    prevSelected: string | null;
  };
  quadrants: Quadrant[];
}
export const defaultState: IFiltersState = {
  companies: {
    ITR_BE: true,
    ITR_NL: true,
    FM: true,
    IS: true,
  },
  dataSet: {
    availableDates: [],
    selected: null,
    prevSelected: null,
  },
  quadrants: [],
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
          prevSelected: state.dataSet.selected,
        },
      };

    case EFilterActionTypes.FILL_DATA_SET_DATES:
      return {
        ...state,
        dataSet: {
          ...state.dataSet,
          availableDates: action.payload,
        },
      };
    case EFilterActionTypes.FILL_QUADRANTS:
      return {
        ...state,
        quadrants: action.payload,
      };

    default:
      return state;
  }
};
