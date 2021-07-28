import { reactive } from 'vue'
import { UrbanDictionaryResult } from '../types'

const data = {
  data: null as (UrbanDictionaryResult | null),
}

export default reactive(data)
