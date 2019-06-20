import Vue from 'vue'

const data = {
  data: [] as Array<string>,
  inputText: '',
  sourceLanguage: '',
  detectedLanguage: '',
  targetLanguage: '',
}

export default Vue.observable(data)
