export interface AliApiTranslateResult {
  RequestId: string
  Data: {
    Translated: string
  }
  Code: string
}

export interface AliApiTranslateParams {
  word: string
  payload?: {
    sl: string
    tl: string
  }
}
