export interface GetGoogleTranslateResult {
  phon: string | null
  translate: Array<{
    text: string
    variations: Array<string>
  }>
  translatePhonetics: string
  sourceLanguage: string
  targetLanguage: string
  detectedLanguage: string
  fromDict: boolean
}

export interface GoogleTranslatePlayAudioPayload {
  word: string
  tl: string
}
