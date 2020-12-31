export interface GetGoogleTranslateResult {
  phon: string | null
  translate: string
  translatePhone: string
  translateVariations: Array<string>
  sourceLanguage: string
  targetLanguage: string
  detectedLanguage: string
  fromDict: boolean
}

export interface GoogleTranslatePlayAudioPayload {
  word: string
  tl: string
}
