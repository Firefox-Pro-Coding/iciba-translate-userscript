import Vue from 'vue'
import { IcibaResult } from './type'

const data = {
  data: null as (IcibaResult | null),
}

export default Vue.observable(data)
