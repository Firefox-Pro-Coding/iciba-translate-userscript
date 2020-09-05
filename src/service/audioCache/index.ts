import playAudio from '~/util/playAudio'

interface PlayAudio {
  (key: string, volumeorbuffer?: number | ArrayBuffer): boolean
  (key: string, buf: ArrayBuffer, volume: number): boolean
}

const audioMap = new Map<string, ArrayBuffer>()

const play: PlayAudio = (key: string, p1?: ArrayBuffer | number, p2?: number) => {
  const buffer = p1 instanceof ArrayBuffer ? p1 : null
  const volume = typeof p1 === 'number' ? p1 : p2 ?? 1
  if (buffer) {
    audioMap.set(key, buffer)
    playAudio(buffer, volume)
    return true
  }
  const cachedBuffer = audioMap.get(key)
  if (cachedBuffer) {
    playAudio(cachedBuffer, volume)
    return true
  }

  return false
}

export const audioCacheService = {
  play,
}
