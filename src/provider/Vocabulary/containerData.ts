import { reactive } from 'vue'
import { Data } from './types'

const data = {
  data: null as null | Data,
}

export default reactive(data)
