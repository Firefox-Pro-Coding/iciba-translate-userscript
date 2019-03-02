import { getValue, setValue } from '~/src/util/gmapi'

import globalBus from '~/src/bus/bus'

import * as core from './settingProvider/core'
import * as iciba from './settingProvider/iciba'
import * as googleDict from './settingProvider/googleDict'
import * as googleTranslate from './settingProvider/googleTranslate'
import * as baiduTranslate from './settingProvider/baiduTranslate'

type SettingType = 'core' | 'iciba' | 'googleDict' | 'googleTranslate' | 'baiduTranslate'

type SetSettingValueType = core.CoreSetting
| iciba.ProviderSetting
| googleDict.ProviderSetting
| googleTranslate.ProviderSetting
| baiduTranslate.ProviderSetting

interface State {
  core: core.CoreSetting
  iciba: iciba.ProviderSetting
  googleDict: googleDict.ProviderSetting
  googleTranslate: googleTranslate.ProviderSetting
  baiduTranslate: baiduTranslate.ProviderSetting
}

class Store {
  public state!: State

  public async loadSetting() {
    const settingString = await getValue('iciba_setting', '')
    let setting: State
    try {
      setting = JSON.parse(settingString)
    } catch (e) {
      setting = this.getDefaultSetting()
    }

    setting = {
      core: core.getValidSetting(setting.core),
      iciba: iciba.getValidSetting(setting.iciba),
      googleDict: googleDict.getValidSetting(setting.googleDict),
      googleTranslate: googleTranslate.getValidSetting(setting.googleTranslate),
      baiduTranslate: baiduTranslate.getValidSetting(setting.baiduTranslate),
    }

    this.state = setting
  }

  public async saveSetting() {
    const setting = this.state || this.getDefaultSetting()
    await setValue('iciba_setting', JSON.stringify(setting))
  }

  public getSetting(type: 'core'): core.CoreSetting
  public getSetting(type: 'iciba'): iciba.ProviderSetting
  public getSetting(type: 'googleDict'): googleDict.ProviderSetting
  public getSetting(type: 'googleTranslate'): googleTranslate.ProviderSetting
  public getSetting(type: 'baiduTranslate'): baiduTranslate.ProviderSetting
  public getSetting(type: SettingType) {
    interface Copy {
      <T>(v: T): T
    }
    const copy: Copy = v => JSON.parse(JSON.stringify(v))

    if (type === 'core') {
      return copy(this.state.core)
    }
    if (type === 'iciba') {
      return copy(this.state.iciba)
    }
    if (type === 'googleDict') {
      return copy(this.state.googleDict)
    }
    if (type === 'googleTranslate') {
      return copy(this.state.googleTranslate)
    }
    if (type === 'baiduTranslate') {
      return copy(this.state.baiduTranslate)
    }
    throw new Error('impossible condition')
  }

  public setSetting(type: 'core', value: core.CoreSetting): void
  public setSetting(type: 'iciba', value: iciba.ProviderSetting): void
  public setSetting(type: 'googleDict', value: googleDict.ProviderSetting): void
  public setSetting(type: 'googleTranslate', value: googleTranslate.ProviderSetting): void
  public setSetting(type: 'baiduTranslate', value: baiduTranslate.ProviderSetting): void
  public setSetting(type: SettingType, _value: SetSettingValueType): void {
    // make a copy
    const value = JSON.parse(JSON.stringify(_value))
    if (type === 'core') {
      this.state[type] = (value as core.CoreSetting)
    } else if (type === 'iciba') {
      this.state[type] = (value as iciba.ProviderSetting)
    } else if (type === 'googleDict') {
      this.state[type] = (value as googleDict.ProviderSetting)
    } else if (type === 'googleTranslate') {
      this.state[type] = (value as googleTranslate.ProviderSetting)
    } else if (type === 'baiduTranslate') {
      this.state[type] = (value as baiduTranslate.ProviderSetting)
    }

    globalBus.emit(globalBus.events.SETTING_STORE_UPDATE)
    this.saveSetting()
  }

  private getDefaultSetting(): State {
    return {
      core: core.getDefaultSetting(),
      iciba: iciba.getDefaultSetting(),
      googleDict: googleDict.getDefaultSetting(),
      googleTranslate: googleTranslate.getDefaultSetting(),
      baiduTranslate: baiduTranslate.getDefaultSetting(),
    }
  }
}

export default new Store()
