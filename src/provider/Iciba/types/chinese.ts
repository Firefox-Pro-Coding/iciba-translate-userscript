import {
  TypeOf,
  string,
  array,
  type,
  union,
  partial,
} from 'io-ts'
import { excess } from '~/util/extendIoTs/excess'

/** 汉字 */
export const chineseZiItem = excess(type({
  id: string, // "1171"
  hanzi: string, // "提"
  pinxie: string, // ""
  pinyin: string, // "dī"
  fanti: string, // ""
  bushou: string, // "扌部"
  bihua: string, // "12笔"
  wubi: string, // "RJGH"
  biaoma: string, // "FDTV。另见tí。"
  zaozi: string, // "形声；从扌、是声"
  jiegou: string, // "左右结构"
  ciyu: string, // "提防,提溜,"
  jieshi: string, // "提防。"
  fanyi: string, // ""
  xingsi: string, // ""
  tongyin: string, // "见“滴”"
  yanbian: string, // "0"
  nixu: string, // ""
  english: string, // "提防：guard against"
  ziyi: array(string), // ["提防。"]
  sid: string, // "1171"
}), 'chinese-zi-item')
export type ChineseZiItem = TypeOf<typeof chineseZiItem>

/** 词组 */
export const chineseCi = excess(type({
  id: string, // "83711"
  ciyu: string, // "你好"
  pinxie: string, // "nihao"
  pinyin: string, // "nǐ hǎo"
  jieshi: string, // "(名)①乔木,果实圆形.味甜或略酸,是普通水果.②这种植物的果实.买~.(作宾语)〈外〉梵语."
  goucheng: string,
  tongyi: string,
  fanyi: string,
  tongyin: string,
  liju: string,
  zi: string, // "你"
  zid: string, // "4383"
  ciyi: union([
    string,
    array(string), // ["（名）乔木；果实圆形。味甜或略酸；是普通水果。", "（名）这种植物的果实。买～。（作宾语）〈外〉梵语。"]
  ]),
}), 'chinese-ci')
export type ChineseCi = TypeOf<typeof chineseCi>

/** chinese */
export const chinese = excess(partial({
  ci: chineseCi,
  zi: array(chineseZiItem),
}), 'chinese')
export type Chinese = TypeOf<typeof chinese>
