import { reactive, watch } from 'vue'
import * as E from 'fp-ts/lib/Either'
import { identity, pipe } from 'fp-ts/lib/function'
import { Errors, Any, TypeOf } from 'io-ts'

import { getValue, setValue } from '~/util/gmapi'
import copy from '~/util/copy'
import { GM_STORE_KEY } from '~/constants'
import { Provider } from '~/provider/create'

import * as core from './core'

type StoreType = {
  core: TypeOf<typeof core.storeType>
} & Record<string, Any>

export const store = {} as StoreType

const setDefaultDataByPath = (path: Array<string>, _data: any, _defaultData: any) => {
  let data = _data
  let defaultData = _defaultData
  for (let i = 0; i < path.length - 1; i += 1) {
    data = data[path[i]]
    defaultData = defaultData[path[i]]
  }
  const lastPath = path[path.length - 1]
  data[lastPath] = copy(defaultData[lastPath])
}

const decode = (type: Any, _data: unknown, defaultData: any) => {
  const data = copy(_data)
  let report!: E.Either<Errors, any>
  for (let i = 0; i < 3; i += 1) {
    report = type.decode(data)
    if (report._tag === 'Left') {
      report.left.forEach((e) => {
        const pathArray = e.context.map((path) => path.key).filter((v) => v)
        setDefaultDataByPath(pathArray, data, defaultData)
      })
    } else {
      return report.right as unknown
    }
  }
  return data
}

export const initStore = async (providers: ReadonlyArray<Provider>) => {
  const dataString = await getValue(GM_STORE_KEY.STORE, '') as string

  const data: any = pipe(
    E.tryCatch(
      () => JSON.parse(dataString) as unknown,
      identity,
    ),
    (v) => (E.isLeft(v) ? {} : v.right),
    (v) => (Array.isArray(v) ? {} : v),
  )

  providers.forEach((p) => {
    const providerStore = decode(p.storeType, data[p.id], p.defaultStore)
    const reactiveData = reactive(providerStore as any)
    p.storeWrapper.data = reactiveData
    data[p.id] = reactiveData
  })

  const coreStore = decode(core.storeType, data.core, core.defaultData)
  data.core = reactive(coreStore as any)

  const newStore = reactive(data)

  watch(
    newStore,
    () => {
      const dataString = JSON.stringify(newStore)
      setValue(GM_STORE_KEY.STORE, dataString)
    },
    { deep: true },
  )

  Object.assign(store, newStore)
}
