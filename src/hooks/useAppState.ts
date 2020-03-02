import { useEffect, useReducer } from 'react';
import { mockData } from '../mock';

export interface AppState {
  technologies: Technology[];
  selected: Technology | null;
}

enum EActions {
  'SELECT' = 'SELECT',
  'SET_TECHNOLOGIES' = 'SET_TECHNOLOGIES',
}

const selectTechnology = (payload: Technology) =>
  ({
    type: EActions.SELECT,
    payload,
  } as const);

const setTechnologies = (payload: Technology[]) =>
  ({
    type: EActions.SET_TECHNOLOGIES,
    payload,
  } as const);

const actionCreators = {
  selectTechnology,
  setTechnologies,
};

type Actions = {
  [K in keyof typeof actionCreators]: ReturnType<typeof actionCreators[K]>;
}[keyof typeof actionCreators];

const initialState: AppState = { technologies: [], selected: null };

const reducer = (state: AppState, action: Actions): AppState => {
  switch (action.type) {
    case EActions.SELECT:
      return {
        ...state,
        selected: action.payload,
      };
    case EActions.SET_TECHNOLOGIES:
      return {
        technologies: action.payload,
        selected: null,
      };
    default:
      throw new Error();
  }
};
export const useAppState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // loading technologies from mock now
  useEffect(() => {
    dispatch(setTechnologies(mockData));
  }, []);

  return {
    state,
  };
};
