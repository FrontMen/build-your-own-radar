export const generateBuilder = <T>(defaultState: T) => (
  modifiedAttributes: Partial<T> = {}
): T => ({
  ...defaultState,
  ...modifiedAttributes,
});
