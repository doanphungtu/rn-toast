import React from 'react';

function useTimeout<CbParams>(cb: (params?: CbParams) => void, delayMs = 0) {
  const ref = React.useRef<NodeJS.Timeout>(undefined);

  const clearTimer = React.useCallback(() => {
    if (ref.current) {
      clearTimeout(ref.current);
      ref.current = undefined;
    }
  }, []);

  const startTimer = React.useCallback(() => {
    clearTimer();
    ref.current = setTimeout(() => {
      cb();
      ref.current = undefined;
    }, delayMs);
  }, [clearTimer, delayMs, cb]);

  React.useEffect(() => () => clearTimer(), [clearTimer]);

  return {
    startTimer,
    clearTimer,
    isActive: ref.current !== undefined,
  };
}

export { useTimeout };
