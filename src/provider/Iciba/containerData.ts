import Vue from 'vue'
import { Codec } from './types'

const data = {
  data: null as (Codec | null),
}

export default Vue.observable(data)
