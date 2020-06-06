import {
  TypeOf,
  string,
  type,
  number,
  intersection,
  partial,
} from 'io-ts'
import { excess } from '~/util/extendIoTs/excess'

export const tikWordInfo = excess(intersection([
  type({
    is_have_video_info: number,
  }),
  partial({
    video_bg_image: string,
  }),
]))
export type TikWordInfo = TypeOf<typeof tikWordInfo>
