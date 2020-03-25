import { defaultRootState, IRootState } from 'src/redux/reducers';
import { ITechnologiesState } from 'src/redux/reducers/technologies';
import { generateBuilder } from './utils';
import configureMockStore from 'redux-mock-store';

const builderFor = <T extends keyof IRootState>(
  key: T,
  partialState: Partial<IRootState[T]> = {},
): IRootState =>
  rootStateBuilder({
    [key]: {
      ...defaultRootState[key],
      ...partialState,
    },
  });

export const storeCreator = configureMockStore<IRootState>();

export const rootStateBuilder = generateBuilder<IRootState>(defaultRootState);
export const technologiesStateBuilder = (partialState: Partial<ITechnologiesState>) =>
  builderFor<'technologies'>('technologies', partialState);
