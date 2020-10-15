type KeywordCache = Record<string, {
  data: string | Promise<string>
}>

const cache: KeywordCache = {}

export default cache
