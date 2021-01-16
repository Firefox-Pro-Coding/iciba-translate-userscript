import { reactive, watch } from 'vue'
import * as E from 'fp-ts/lib/Either'
import { identity, pipe } from 'fp-ts/lib/function'
import { exact, type, TypeOf, Errors } from 'io-ts'

import { getValue, setValue } from '~/util/gmapi'
import copy from '~/util/copy'

import { GM_STORE_KEY, PROVIDER } from '~/constants'

import * as core from './modules/core'
import * as iciba from './modules/iciba'
import * as googleDict from './modules/googleDict'
import * as googleTranslate from './modules/googleTranslate'
import * as baiduTranslate from './modules/baiduTranslate'
import * as sougouTranslate from './modules/sougouTranslate'
import * as urbanDictionary from './modules/urbanDictionary'
import * as bingTranslate from './modules/bingTranslate'
import * as vocabulary from './modules/vocabulary'

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

const setDefaultDataByPath = (path: Array<string>, _data: any) => {
  let data = _data
  let dData = defaultData as any
  for (let i = 0; i < path.length - 1; i += 1) {
    data = data[path[i]]
    dData = dData[path[i]]
  }
  const lastPath = path[path.length - 1]
  data[lastPath] = copy(dData[lastPath])
}

/* eslint-disable @typescript-eslint/no-use-before-define */
const useStore = () => {
  const loadConfig = async () => {
    const dataString = await getValue(GM_STORE_KEY.STORE, '') as string

    let data: any = pipe(
      E.tryCatch(
        () => JSON.parse(dataString) as unknown,
        identity,
      ),
      (v) => (E.isLeft(v) ? {} : v.right),
      (v) => (Array.isArray(v) ? {} : v),
    )

    let report!: E.Either<Errors, any>
    for (let i = 0; i < 3; i += 1) {
      report = storeType.decode(data)
      if (report._tag === 'Left') {
        report.left.forEach((e) => {
          const pathArray = e.context.map((path) => path.key).filter((v) => v)
          setDefaultDataByPath(pathArray, data)
        })
      } else {
        data = report.right
        break
      }
    }

    if (report._tag === 'Left') {
      data = defaultData
    }

    store.config = reactive(data)

    watch(() => store.config, () => {
      saveConfig()
    }, { deep: true })
  }

  const saveConfig = () => {
    const dataString = JSON.stringify(store.config)
    setValue(GM_STORE_KEY.STORE, dataString)
  }

  const store = {
    config: null as any as Config,
    loadConfig,
  }

  return store
}

export const store = useStore()
