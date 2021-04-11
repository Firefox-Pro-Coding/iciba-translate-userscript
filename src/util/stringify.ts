/** fix prototype.js Array.prototype.toJSON pollution */
export const stringify = (...args: Parameters<typeof JSON.stringify>) => {
  const arrayToJSON = (Array.prototype as any).toJSON
  const stringyfy = JSON.stringify;
  (Array.prototype as any).toJSON = undefined
  const result = stringyfy.call(JSON, ...args);
  (Array.prototype as any).toJSON = arrayToJSON
  return result
}
