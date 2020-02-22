import { reactive } from '@vue/composition-api'
import { UrbanDictionaryResult } from './type'

const data = {
  data: null as (UrbanDictionaryResult | null),
}

export default reactive(data)
