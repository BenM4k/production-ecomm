/*
    to use on when interested by the intermediate state, at intervals
    here I use it for search inputs
*/

export const throttle = (fn, delay) => {
  let lastTime = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastTime < delay) {
      lastTime = now;
      fn(...args);
    }
  };
};
