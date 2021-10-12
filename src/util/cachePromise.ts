/**
 * 返回原函数，但该函数在连续多次调用时，首次调用未resolve时，返回缓存的 promise
 */
export const cachePromiseHof = <T extends (...args: Array<any>) => unknown>(fn: T) => {
  let promise: null | Promise<unknown> = null;

  return ((...args) => {
    if (promise) {
      return promise;
    }
    promise = Promise.resolve(fn(...args));
    promise.finally(() => {
      promise = null;
    });
    return promise;
  }) as T;
};
