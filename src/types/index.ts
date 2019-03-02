import Vue from 'vue'

export interface IcibaIconType {
  data: string
  hash: string
}

export interface IcibaVue extends Vue {
  [name: string]: any
}

export interface IcibaPositionStyle {
  top?: string
  bottom?: string
  left?: string
  right?: string
}

export interface IcibaStyle {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export interface IcibaTranslateProviderSettingDescriptorItem {
  name: string // uniq name of this setting
  description: string // description text display to user
  type: 'string' | 'select' | 'number' // setting item type
  default: string // default value if not set
  options?: Array<string> // required if type is select
  regex?: RegExp // optional regexp test
  validator?: (value: string) => Promise<void> // optional validator. reject if invalid.
}

export interface IcibaTranslateProviderSettingItem {
  name: string
  value: string
}

export type IcibaTranslateProviderSettingDescriptors = Array<IcibaTranslateProviderSettingDescriptorItem>
export type ITranslateProviderSettings = Array<IcibaTranslateProviderSettingItem>

export interface IcibaAudioCache {
  [propName: string]: ArrayBuffer
}
