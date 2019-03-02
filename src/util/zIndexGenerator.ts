let zIndex = 100000

const gen = () => {
  zIndex += 1
  return zIndex
}

export const isTop = (z: number) => z === zIndex

export default gen
