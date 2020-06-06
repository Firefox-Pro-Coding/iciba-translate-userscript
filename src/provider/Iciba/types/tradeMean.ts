import {
  TypeOf,
  string,
  array,
  type,
} from 'io-ts'
import { excess } from '~/util/extendIoTs/excess'

/** 行业词典 */
export const tradeMean = excess(type({
  word_trade: string,
  word_mean: array(string),
}), 'tradeMean')
export type TradeMean = TypeOf<typeof tradeMean>
