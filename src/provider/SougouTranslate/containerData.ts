import { reactive } from 'vue'

const data = {
  data: [] as Array<string>,
  inputText: '',
  sourceLanguage: '',
  detectedLanguage: '',
  targetLanguage: '',
}

export default reactive(data)
