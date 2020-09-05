import { reactive } from '@vue/composition-api'
import { Codec } from './types'

export const containerData = reactive({
  data: null as (Codec | null),
})
