import Vue from 'vue'
import { UrbanDictionaryResult } from './type'

const data = {
  data: null as (UrbanDictionaryResult | null),
}

export default Vue.observable(data)
