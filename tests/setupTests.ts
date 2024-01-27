declare global {
  interface Window {
    ethereum: any;
    retry: any;
  }
}

export const retry = (assertion: any, { interval = 20, timeout = 1000 } = {}) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const tryAgain = () => {
      setTimeout(() => {
        try {
          resolve(assertion());
        } catch (err) {
          Date.now() - startTime > timeout ? reject(err) : tryAgain();
        }
      }, interval);
    };

    tryAgain();
  });
};

window.retry = retry;
