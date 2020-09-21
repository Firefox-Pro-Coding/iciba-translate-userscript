import { reactive } from 'vue'

const data = {
  data: [] as Array<string>,
  inputText: '',
  autoMode: false,
  sourceLanguage: '',
  targetLanguage: '',
}

export default reactive(data)
