import { useLocation, useHistory } from 'react-router';
import { useCallback } from 'react';

// React Router does not have any opinions about
// how you should parse URL query strings.
//
// If you use simple key=value query strings and
// you do not need to support IE 11, you can use
// the browser's built-in URLSearchParams API.
//
// If your query strings contain array or object
// syntax, you'll probably need to bring your own
// query parsing function.

// A custom hook that builds on useLocation to parse
// the query string for you.
export const useQueryAsState = () => {
  const query = new URLSearchParams(useLocation().search);
  const selected = query.get('tech');
  const history = useHistory();
  const setQueryState = useCallback(
    (route: string) => {
      if (route) {
        history.push(route);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, positionId] = route.split('='); // Lazy split, the logic could be improved!
        setTimeout(() => {
          const element = document.querySelector(`#${positionId}`);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'end',
              inline: 'nearest',
            });
          }
        }, 0);
      }
    },
    [history],
  );
  return [selected, setQueryState] as [
    null | string,
    (route: string | null) => void,
  ];
};
