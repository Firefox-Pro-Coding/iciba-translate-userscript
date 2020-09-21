import { reactive } from 'vue'
import { GOOGLE_LANGUAGES } from '~/constants/googleLanguages'

const data = {
  data: [] as Array<string>,
  inputText: '',
  sourceLanguage: '',
  targetLanguage: '' as GOOGLE_LANGUAGES,
  detectedLanguage: '' as GOOGLE_LANGUAGES,
  fromDict: false,
}

export default reactive(data)
