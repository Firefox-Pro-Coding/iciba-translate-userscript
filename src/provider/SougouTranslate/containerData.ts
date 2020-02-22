import { reactive } from '@vue/composition-api'

const data = {
  data: [] as Array<string>,
  inputText: '',
  sourceLanguage: '',
  detectedLanguage: '',
  targetLanguage: '',
}

export default reactive(data)
