export const pause = (t = 0) => new Promise(resolve => setTimeout(() => resolve(), t));
