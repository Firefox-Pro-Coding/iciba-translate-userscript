import Vue from 'vue'
import * as t from 'io-ts'
import { getValue, setValue } from '~/util/gmapi'
import * as common from './modules/common'

const GM_VALUE_KEY = 'iciba_store'

const copy: <T>(p: T) => T = (p: any) => (typeof p === 'object' ? JSON.parse(JSON.stringify(p)) : p)

const storeType = t.exact(t.type({
  common: common.type,
}))

type Config = t.TypeOf<typeof storeType>

class Store {
  /** global states */
  public state = Vue.observable({
    googleDictModalVisible: false,
  })

  /** config */
  public config!: Config

  private defaultData: Config = {
    common: common.defaultData,
  }

  public async loadData() {
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

  public saveData() {
    const dataString = JSON.stringify(this.config)
    setValue(GM_VALUE_KEY, dataString)
  }

  private setDefaultDataByPath(path: Array<string>, _data: any) {
    let data = _data
    let defaultData = this.defaultData as any
    for (let i = 0; i < path.length - 1; i += 1) {
      data = data[path[i]]
      defaultData = defaultData[path[i]]
    }
    const lastPath = path[path.length - 1]
    data[lastPath] = copy(defaultData[lastPath])
  }
}

const store = new Store()

export default store
