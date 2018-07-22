// svg.d.ts

declare module '*.svg' {
  import { IIconType } from '~/src/types/index'

  const data: IIconType
  export default data
}
