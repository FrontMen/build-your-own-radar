import { Reducer } from 'redux';
import { TActions } from 'redux/types';
import { EFilterActionTypes } from 'redux/actions/filters';
// type TCompany = {
//   [key in CompanyTypes]: boolean;
// };

interface CompanyCheckBox extends Company {
  checked: boolean;
}

export interface IFiltersState {
  companies: CompanyCheckBox[];
  dataSet: {
    availableDates: string[];
    selected: string | null;
    prevSelected: string | null;
  };
  quadrants: Quadrant[];
}
export const defaultState: IFiltersState = {
  companies: [],
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
      const companies = [...state.companies];
      const index = companies.findIndex(c => c.shortName === action.payload);
      const company = companies[index];
      companies[index] = { ...company, checked: !company.checked };

      return {
        ...state,
        companies,
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
    case EFilterActionTypes.FILL_COMPANIES:
      return {
        ...state,
        companies: action.payload.map(({ ...company }) => ({
          checked: true,
          ...company,
        })),
      };
    default:
      return state;
  }
};
