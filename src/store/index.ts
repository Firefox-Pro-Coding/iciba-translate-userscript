import { getValue, setValue } from '~/src/lib/gmapi'

import * as iciba from './provider/iciba'
import { SettingType } from './types'
import { CoreStore } from './core'

interface State {
  iciba: iciba.ProviderSetting
  core: CoreStore
}

class Store {
  public state: State = this.getDefaultSetting()

  public async loadSetting() {
    const settingString = await getValue('iciba_setting', '')
    let setting: any
    try {
      setting = JSON.parse(settingString)
    } catch (e) {
      setting = this.getDefaultSetting()
    }

    this.state = setting
  }

  public async saveSetting() {
    const setting = this.state || this.getDefaultSetting()
    await setValue('iciba_setting', JSON.stringify(setting))
  }

  public async setSetting(type: SettingType, value: any) {
    (this.state as any)[type] = value
  }

  private getDefaultSetting(): State {
    return {
      iciba: iciba.getDefaultSetting(),
      core: this.getCoreDefaultSetting(),
    }
  }

  private getCoreDefaultSetting(): CoreStore {
    return {
      pressCtrlToHide: false,
      stick: false,
      draggable: false,
      defaultProvider: 'iciba',
    }
  }
}

export default new Store()
