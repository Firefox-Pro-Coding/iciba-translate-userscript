export enum Z_INDEX_KEY {
  GENERAL = 'GENERAL',
  GOOGLE_DICT_MODAL = 'GOOGLE_DICT_MODAL',
}

const useZIndexService = () => {
  // https://stackoverflow.com/questions/491052/minimum-and-maximum-value-of-z-index
  let zIndex = 2147483647 - 100000

  const zIndexUseMap = new Map<Z_INDEX_KEY, number>()

  const gen = (key: Z_INDEX_KEY) => {
    zIndex += 1
    const newZIndex = zIndex
    zIndexUseMap.set(key, newZIndex)

    return newZIndex
  }

  const get = (key: Z_INDEX_KEY) => zIndexUseMap.get(key) ?? 0

  const isTop = (z: number) => z === zIndex

  return {
    gen,
    get,
    isTop,
  }
}

export const zIndexService = useZIndexService()
