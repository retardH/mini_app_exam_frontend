import { useEffect, useState } from "react";

export const useDebounceState = (stateData: any, delay?: number) => {
  const [debouncedState, setDebouncedState] = useState(stateData);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined = undefined;
    if (!!timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setDebouncedState(stateData);
    }, delay ?? 500);
  }, [stateData]);

  return debouncedState;
};
