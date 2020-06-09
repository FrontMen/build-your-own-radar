import { Reducer } from 'redux';
import { TActions } from 'redux/types';
import { EAuthActionTypes } from 'redux/actions/auth';

export interface IAuthState {
  error: string | null;
  authorized: boolean;
  loading: boolean;
  user: any;
}
export const defaultState: IAuthState = {
  error: null,
  authorized: false,
  loading: false,
  user: null,
};

export const authReducer: Reducer<IAuthState, TActions> = (
  state = defaultState,
  action,
): IAuthState => {
  switch (action.type) {
    case EAuthActionTypes.FETCH_TOKEN:
      return {
        ...state,
        loading: true,
      };
    case EAuthActionTypes.SET_STATUS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    default:
      return state;
  }
};
