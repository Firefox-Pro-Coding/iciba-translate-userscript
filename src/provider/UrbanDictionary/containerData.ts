import { reactive } from 'vue'
import { UrbanDictionaryResult } from './type'

const data = {
  data: null as (UrbanDictionaryResult | null),
}

export default reactive(data)
