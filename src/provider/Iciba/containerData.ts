import { reactive } from 'vue'
import { Codec } from './types'

export const containerData = reactive({
  data: null as (Codec | null),
})
