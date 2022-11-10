import { reactive } from 'vue'

import { AliApiTranslateResult } from '~/provider/AliApiTranslate/types'

const data = {
  data: null as null | AliApiTranslateResult,
  inputText: '',
  autoMode: false,
  sourceLanguage: '',
  targetLanguage: '',
}

export default reactive(data)
