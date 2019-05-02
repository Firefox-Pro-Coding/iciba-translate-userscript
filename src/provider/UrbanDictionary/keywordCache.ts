interface KeywordCache {
  [k: string]: {
    data: string | Promise<string>
  }
}

const cache: KeywordCache = {}

export default cache
