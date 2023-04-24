import createDebug from 'debug';

export const isPromise = (obj: any) => {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
};

export { createDebug };
export const containerRandomId = `dilu__${+Date.now()}_${Math.floor(Math.random() * 1000)}`;
