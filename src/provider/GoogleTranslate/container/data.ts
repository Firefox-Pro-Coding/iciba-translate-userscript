import { reactive } from 'vue'
import { GetGoogleTranslateResult } from '../types'

const data = {
  data: null as null | GetGoogleTranslateResult,
  inputText: '',
}

export default reactive(data)
