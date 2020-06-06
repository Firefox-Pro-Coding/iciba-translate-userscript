import {
  TypeOf,
  string,
  array,
  type,
} from 'io-ts'
import { excess } from '~/util/extendIoTs/excess'

export const thesaurusMeans = excess(type({
  word_mean: string,
  cis: array(string),
}), 'ThesaurusMeans')
export type ThesaurusMeansans = TypeOf<typeof thesaurusMeans>


/** 同反义词 */
export const thesaurus = excess(type({
  part_name: string,
  means: array(thesaurusMeans),
}), 'thesaurus')
export type Thesaurus = TypeOf<typeof thesaurus>
