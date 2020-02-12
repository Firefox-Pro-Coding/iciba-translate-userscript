import Vue from 'vue'
import { exact, type, TypeOf } from 'io-ts'
import { getValue, setValue } from '~/util/gmapi'
import copy from '~/util/copy'

import { PROVIDER } from '~/constants/constant'

import * as core from './modules/core'
import * as iciba from './modules/iciba'
import * as googleDict from './modules/googleDict'
import * as googleTranslate from './modules/googleTranslate'
import * as baiduTranslate from './modules/baiduTranslate'
import * as sougouTranslate from './modules/sougouTranslate'
import * as urbanDictionary from './modules/urbanDictionary'
import * as bingTranslate from './modules/bingTranslate'
import * as vocabulary from './modules/vocabulary'

const GM_VALUE_KEY = 'iciba_store'

const storeType = exact(type({
  core: core.type,
  [PROVIDER.ICIBA]: iciba.type,
  [PROVIDER.GOOGLE_DICT]: googleDict.type,
  [PROVIDER.GOOGLE_TRANSLATE]: googleTranslate.type,
  [PROVIDER.BAIDU_TRANSLATE]: baiduTranslate.type,
  [PROVIDER.SOUGOU_TRANSLATE]: sougouTranslate.type,
  [PROVIDER.URBAN_DICTIONARY]: urbanDictionary.type,
  [PROVIDER.BING_TRANSLATE]: bingTranslate.type,
  [PROVIDER.VOCABULARY]: vocabulary.type,
}))

export type Config = TypeOf<typeof storeType>

export const defaultData: Config = {
  core: core.defaultData,
  [PROVIDER.ICIBA]: iciba.defaultData,
  [PROVIDER.GOOGLE_DICT]: googleDict.defaultData,
  [PROVIDER.GOOGLE_TRANSLATE]: googleTranslate.defaultData,
  [PROVIDER.BAIDU_TRANSLATE]: baiduTranslate.defaultData,
  [PROVIDER.SOUGOU_TRANSLATE]: sougouTranslate.defaultData,
  [PROVIDER.URBAN_DICTIONARY]: urbanDictionary.defaultData,
  [PROVIDER.BING_TRANSLATE]: bingTranslate.defaultData,
  [PROVIDER.VOCABULARY]: vocabulary.defaultData,
}

class Store {
  /** global states */
  public state = Vue.observable({
    googleDict: {
      subsenseFolded: false,
      thesaurusFolded: false,
    },
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
      report.left.forEach((e) => {
        const pathArray = e.context.map((path) => path.key).filter((v) => v)
        this.setDefaultDataByPath(pathArray, data)
      })
    }

    this.config = Vue.observable(data)
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

export const store = new Store()
