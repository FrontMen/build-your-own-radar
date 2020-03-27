import merge from 'lodash.merge';

export const generateBuilder = <T>(defaultState: T) => (
  modifiedAttributes: RecursivePartial<T> = {}
): T => merge(defaultState, modifiedAttributes);
