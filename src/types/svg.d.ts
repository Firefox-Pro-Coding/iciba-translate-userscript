// svg.d.ts

declare module '*.svg' {
  import { IIconType } from '~/src/interfaces/index'

  const data: IIconType
  export default data
}
