import { configureMockStore } from '@jedmao/redux-mock-store';

import { defaultRootState, IRootState } from 'redux/reducers';
import { ITechnologiesState } from 'redux/reducers/technologies';
import { generateBuilder } from 'test/builders/utils';

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
export const technologiesStateBuilder = (
  partialState: Partial<ITechnologiesState>,
) => builderFor<'technologies'>('technologies', partialState);
