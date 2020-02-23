export const useIncrement = (id: number = 0) => {
  let v = id
  return () => {
    v += 1
    return v
  }
}
