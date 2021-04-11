/** fix prototype.js Array.prototype.toJSON pollution */
export const stringify = (...args: Parameters<typeof JSON.stringify>) => {
  const stringyfy = JSON.stringify
  const arrayToJSON = (Array.prototype as any).toJSON
  const hasToJSON = 'toJSON' in Array.prototype
  if (hasToJSON) {
    (Array.prototype as any).toJSON = undefined
  }
  const result = stringyfy.call(JSON, ...args)
  if (hasToJSON) {
    (Array.prototype as any).toJSON = arrayToJSON
  }
  return result
}
