import { useRef } from 'react';

const useAsyncPolling = (pollingFn, interval) => {
  const isPolling = useRef(false);
  const startPolling = async () => {
    if (isPolling.current === true) return;
    isPolling.current = true;
    while (isPolling.current === true) {
      await pollingFn();
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  };
  const stopPolling = () => {
    isPolling.current = false;
  };
  return { startPolling, stopPolling };
};

export { useAsyncPolling };
//# sourceMappingURL=useAsyncPolling.esm.js.map
