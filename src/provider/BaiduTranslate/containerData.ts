import { reactive } from '@vue/composition-api'

const data = {
  data: [] as Array<string>,
  inputText: '',
  autoMode: false,
  sourceLanguage: '',
  targetLanguage: '',
}

export default reactive(data)
