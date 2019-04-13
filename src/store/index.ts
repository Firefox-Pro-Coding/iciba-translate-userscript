import Vue from 'vue'
import * as t from 'io-ts'
import { getValue, setValue } from '~/util/gmapi'
import copy from '~/util/copy'

import { PROVIDER } from '~/constants/constant'

import * as common from './modules/common'
import * as iciba from './modules/iciba'
import * as googleDict from './modules/googleDict'
import * as googleTranslate from './modules/googleTranslate'
import * as baiduTranslate from './modules/baiduTranslate'

const GM_VALUE_KEY = 'iciba_store'

const storeType = t.exact(t.type({
  common: common.type,
  [PROVIDER.ICIBA]: iciba.type,
  [PROVIDER.GOOGLE_DICT]: googleDict.type,
  [PROVIDER.GOOGLE_TRANSLATE]: googleTranslate.type,
  [PROVIDER.BAIDU_TRANSLATE]: baiduTranslate.type,
}))

export type Config = t.TypeOf<typeof storeType>

export const defaultData: Config = {
  common: common.defaultData,
  [PROVIDER.ICIBA]: iciba.defaultData,
  [PROVIDER.GOOGLE_DICT]: googleDict.defaultData,
  [PROVIDER.GOOGLE_TRANSLATE]: googleTranslate.defaultData,
  [PROVIDER.BAIDU_TRANSLATE]: baiduTranslate.defaultData,
}

class Store {
  /** global states */
  public state = Vue.observable({
    googleDictModalVisible: false,
  })

  /** config */
  public config!: Config

  private defaultData = defaultData

  public async loadConfig() {
    let dataString
    try {
      dataString = await getValue(GM_VALUE_KEY, '') as string
    } catch (e) {
      dataString = ''
    }

    let data: any
    try {
      data = JSON.parse(dataString)
    } catch (e) {
      data = {}
    }

    if (Array.isArray(data)) {
      data = {}
    }

    const report = storeType.decode(data)
    // eslint-disable-next-line no-underscore-dangle
    if (report._tag === 'Left') {
      report.value.forEach((e) => {
        const pathArray = e.context.map(path => path.key).filter(v => v)
        this.setDefaultDataByPath(pathArray, data)
      })
    }

    this.config = Vue.observable(data)

    Vue.prototype.store = this.state
    Vue.prototype.config = this.config
    Vue.prototype.$store = this
  }

  public saveConfig() {
    const dataString = JSON.stringify(this.config)
    setValue(GM_VALUE_KEY, dataString)
  }

  private setDefaultDataByPath(path: Array<string>, _data: any) {
    let data = _data
    let dData = this.defaultData as any
    for (let i = 0; i < path.length - 1; i += 1) {
      data = data[path[i]]
      dData = dData[path[i]]
    }
    const lastPath = path[path.length - 1]
    data[lastPath] = copy(dData[lastPath])
  }
}

const store = new Store()

export default store
