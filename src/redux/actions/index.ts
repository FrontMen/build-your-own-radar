import { filtersActions } from './filters';
import { technologiesActions } from './technologies';

export const actions = {
  ...filtersActions,
  ...technologiesActions
};
