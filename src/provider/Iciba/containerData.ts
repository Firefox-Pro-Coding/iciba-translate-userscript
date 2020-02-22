import { reactive } from '@vue/composition-api'
import { Codec } from './types'

const data = {
  data: null as (Codec | null),
}

export default reactive(data)
