import * as React from 'react';

export function useDelay(ms) {
  const [delay, setDelay] = React.useState(true);
  const timeout = React.useRef();

  React.useEffect(() => {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      setDelay(false);
    }, ms);
  }, [ms]);

  return delay;
}
