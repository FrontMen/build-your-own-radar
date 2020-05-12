import { ActionWithPayload } from 'redux/types';

export enum EFilterActionTypes {
  TOGGLE_COMPANY = 'filters/toggle-company',
  SELECT_DATA_SET = 'filters/select-data-set',
  FILL_DATA_SET_DATES = 'filters/fill-data-set-dates',
  FILL_QUADRANTS = 'filters/fill-quadrants',
}

type TToggleCompany = ActionWithPayload<
  EFilterActionTypes.TOGGLE_COMPANY,
  CompanyTypes
>;
const toggleCompany = (company: CompanyTypes): TToggleCompany =>
  ({
    type: EFilterActionTypes.TOGGLE_COMPANY,
    payload: company,
  } as const);

type TSelectDataSet = ActionWithPayload<
  EFilterActionTypes.SELECT_DATA_SET,
  string
>;
const selectDataSet = (date: string): TSelectDataSet =>
  ({
    type: EFilterActionTypes.SELECT_DATA_SET,
    payload: date,
  } as const);

type TFillDataSetDates = ActionWithPayload<
  EFilterActionTypes.FILL_DATA_SET_DATES,
  string[]
>;
const fillDataSetDates = (dates: string[]): TFillDataSetDates =>
  ({
    type: EFilterActionTypes.FILL_DATA_SET_DATES,
    payload: dates,
  } as const);

type TFillQuadrants = ActionWithPayload<
  EFilterActionTypes.FILL_QUADRANTS,
  Quadrant[]
>;
const fillQuandrants = (quadrants: Quadrant[]): TFillQuadrants =>
  ({
    type: EFilterActionTypes.FILL_QUADRANTS,
    payload: quadrants,
  } as const);

export const filtersActions = {
  toggleCompany,
  selectDataSet,
  fillDataSetDates,
  fillQuandrants,
};
