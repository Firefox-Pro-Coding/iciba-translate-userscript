import { number, string, type, TypeOf } from 'io-ts'
import { PROVIDER } from '~/constants'
import { enumType } from '~/util/extendIoTs/enum'
import { excess } from '~/util/extendIoTs/excess'

export const historyItem = excess(type({
  word: string,
  time: number,
  provider: enumType<PROVIDER>(PROVIDER, 'PROVIDER'),
}))

export type HistoryItem = TypeOf<typeof historyItem>
