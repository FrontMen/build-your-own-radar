import merge from 'lodash.merge';

export const generateBuilder = <T>(defaultState: T) => (
  modifiedAttributes: RecursivePartial<T> = {}
): T => {
  const clone = JSON.parse(JSON.stringify(defaultState));
  return merge(clone, modifiedAttributes)
};
