import { ProviderTypes } from './types'

export interface CoreStore {
  pressCtrlToHide: boolean
  stick: boolean
  draggable: boolean
  defaultProvider: ProviderTypes
}
