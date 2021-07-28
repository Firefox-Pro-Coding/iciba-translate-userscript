import { number, string, type, TypeOf } from 'io-ts'
import { excess } from '~/util/extendIoTs/excess'
import { providerType } from '~/util/extendIoTs/provider'

export const historyItem = excess(type({
  word: string,
  time: number,
  provider: providerType,
}))

export type HistoryItem = TypeOf<typeof historyItem>
