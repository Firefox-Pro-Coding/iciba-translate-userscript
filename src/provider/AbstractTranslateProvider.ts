import Vue from 'vue'

export type ITranslateProviderSettingDescripter = Array<ITranslateProviderSettingDescripterItem>

interface ITranslateProviderSettingDescripterItem {
  settingName: string
  default: string
}

export type ITranslateProviderSetting = Array<ITranslateProviderSettingItem>

interface ITranslateProviderSettingItem {
  settingName: string
  value: string
}

abstract class AbstractTranslateProvider {
  // the container component visible status
  public visible = false

  // unique name of the translate provider
  public abstract uniqName: string

  // base64 value of the traslator icon (square). svg format preferred
  public abstract icon: string

  // container element
  public abstract containerComponent: Vue

  // setting descripter
  public abstract settingDescripter: ITranslateProviderSettingDescripter

  // handle loads settings
  public abstract loadSetting(setting: ITranslateProviderSetting): void | Error

  // read current settings
  public abstract getSetting(): ITranslateProviderSetting

  // translate the word
  public abstract translate(word: string): Promise<void>
}

export default AbstractTranslateProvider
