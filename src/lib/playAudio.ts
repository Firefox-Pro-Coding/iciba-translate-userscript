// using web audio api play sound
let context: AudioContext

const playAudio = async (arrayBuffer: ArrayBuffer, volume: number = 1): Promise<void> => {
  // https://goo.gl/7K7WLu
  context = context || new AudioContext()
  if (context.state === 'suspended') {
    await context.resume()
  }

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

export default playAudio
