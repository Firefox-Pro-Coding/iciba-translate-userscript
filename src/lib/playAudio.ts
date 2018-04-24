// using web audio api play sound
const context = new AudioContext()

export default async(arrayBuffer: ArrayBuffer, volume: number = 1): Promise<void> => {
  // make a copy because decodeAudioData detaches arrayBuffer
  const arrayBufferCopy = arrayBuffer.slice(0)
  const audioBuffer = await context.decodeAudioData(arrayBufferCopy)

  // decode source
  const source = context.createBufferSource()
  source.buffer = audioBuffer

  // volumn filter
  const volumnGainNode = context.createGain()
  volumnGainNode.gain.value = volume

  // connect them
  source.connect(volumnGainNode)
  volumnGainNode.connect(context.destination)

  source.start()
}
