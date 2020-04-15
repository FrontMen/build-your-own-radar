import React from 'react';

export const useClickAway = (onClickOutside: any) => {
  const ref: any = React.useRef(null);

  React.useEffect(() => {
    const checkForClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside('');
      }
    };
    document.addEventListener('click', checkForClickOutside);
    return () => {
      document.removeEventListener('click', checkForClickOutside);
    };
  }, [onClickOutside]);

  return ref;
};
