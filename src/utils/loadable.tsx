import React, {ComponentType, lazy, Suspense} from 'react';

export function loadable<PropsType> (
  componentImportFunc: () => Promise<{ default: ComponentType<any> }>,
  { fallback = null } = { fallback: null },
) {
  const LazyComponent = lazy(componentImportFunc);
  
  return (props: PropsType) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}
