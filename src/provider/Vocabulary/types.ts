export interface Data {
  word: string
  autocomplete: Array<{
    lang: string
    synsetid: string
    word: string
    freq: string
  }>
  definition: {
    short: string | undefined
    long: string | undefined
    audio: string | null
    groups: Array<{
      index: number
      group: Array<{
        type: string | null
        definition: string
      }>
      family: any
    }>
  }
}

export interface ExampleResult {
  status: number
  result: {
    totalHits: number
    sentences: Array<Sentence>
  }
}

export interface Sentence {
  volume: {
    wordCount: number
    corpus: {
      name: string
      id: string
    }
    domains?: Array<Domain>
    sentenceCount: number
    title: string
    dateAdded: string
    datePublished: string
    domain?: Domain
    id: number
    locator: string
    author?: string
  }
  sentence: string
  corpusId: string
  volumeOffset: number
  offsets: Array<number>
  volumeId: number
}

export enum Domain {
  A = 'A',
  N = 'N',
  S = 'S',
  T = 'T',
}
