import Vue from 'vue'

const data = {
  data: [] as Array<string>,
  inputText: '',
  autoMode: false,
  sourceLanguage: '',
  targetLanguage: '',
}

export default Vue.observable(data)
