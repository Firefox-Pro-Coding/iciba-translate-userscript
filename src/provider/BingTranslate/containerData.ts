import Vue from 'vue'
import { BING_LANGUAGES } from '~/constants/bingLanguages'

const data = {
  data: [] as Array<string>,
  inputText: '',
  sourceLanguage: '',
  targetLanguage: '' as BING_LANGUAGES,
  detectedLanguage: '' as BING_LANGUAGES,
}

export default Vue.observable(data)
