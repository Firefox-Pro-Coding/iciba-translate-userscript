import { array, number, string, type, TypeOf } from 'io-ts'
import { excess } from '~/util/extendIoTs/excess'

export const urbanDictionaryItem = excess(type({
  author: string,
  current_vote: string,
  defid: number,
  definition: string,
  example: string,
  permalink: string,
  sound_urls: array(string),
  thumbs_down: number,
  thumbs_up: number,
  word: string,
  written_on: string,
}))
export type UrbanDictionaryItem = TypeOf<typeof urbanDictionaryItem>

export const urbanDictionaryResult = excess(type({
  list: array(urbanDictionaryItem),
}))
export type UrbanDictionaryResult = TypeOf<typeof urbanDictionaryResult>
