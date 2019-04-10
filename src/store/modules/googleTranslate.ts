import * as t from 'io-ts'
import { GOOGLE_TRANSLATE_HOST } from '~/constants/constant'

export const type = t.type({
  translateHost: t.enumType<GOOGLE_TRANSLATE_HOST>(GOOGLE_TRANSLATE_HOST, 'GOOGLE_TRANSLATE_HOST'),
})

export const defaultData: t.TypeOf<typeof type> = {
  translateHost: GOOGLE_TRANSLATE_HOST.GOOGLE_COM,
}
