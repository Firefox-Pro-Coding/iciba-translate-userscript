// svg.d.ts

declare module '*.svg' {
  import { IcibaIconType } from '~/src/types/index'

  const data: IcibaIconType
  export default data
}
