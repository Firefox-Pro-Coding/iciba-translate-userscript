// svg.d.ts

declare module '*.svg' {
  import { IcibaIconType } from '~/types/index'

  const data: IcibaIconType
  export default data
}
