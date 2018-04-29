import Vue from 'vue'

export interface IVue extends Vue {
  [name: string]: any
}

export interface IPositionStyle {
  top?: string,
  bottom?: string,
  left?: string,
  right?: string,
}

export interface IStyle {
  top?: number,
  bottom?: number,
  left?: number,
  right?: number,
}

export interface ITranslateProviderSettingDescriptorItem {
  name: string // uniq name of this setting
  description: string // description text display to user
  type: 'string' | 'select' | 'number' // setting item type
  default: string // default value if not set
  options?: Array<string> // required if type is select
  regex?: RegExp // optional regexp test
  validator?: (value: string) => Promise<void> // optional validator. reject if invalid.
}

export interface ITranslateProviderSettingItem {
  name: string
  value: string
}

export type ITranslateProviderSettingDescriptors = Array<ITranslateProviderSettingDescriptorItem>
export type ITranslateProviderSettings = Array<ITranslateProviderSettingItem>

export interface IAudioCache {
  [propName: string]: ArrayBuffer
}
