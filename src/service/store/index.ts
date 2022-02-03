import { reactive, watch } from 'vue'
import * as E from 'fp-ts/lib/Either'
import { identity, pipe } from 'fp-ts/lib/function'
import { Any, TypeOf } from 'io-ts'

import { getValue, setValue } from '~/util/gmapi'
import { GM_STORE_KEY } from '~/constants'
import { Provider } from '~/provider/create'

import { FallbackInterface, FallbackProps } from '~/util/extendIoTs/fallback'
import copy from '~/util/copy'
import * as core from './core'

type StoreType = {
  core: TypeOf<typeof core.storeType>
} & Record<string, Any>

export const store = {} as StoreType

const decode = <P extends FallbackProps>(type: FallbackInterface<P>, data: unknown) => {
  const report = type.decode(data)
  if (E.isRight(report)) {
    return report.right as unknown
  }
  return type.defaultData
}

export const initStore = async (providers: ReadonlyArray<Provider<any>>) => {
  const dataString = await getValue(GM_STORE_KEY.STORE, '') as string

  const data: any = pipe(
    E.tryCatch(
      () => JSON.parse(dataString) as unknown,
      identity,
    ),
    (v) => (E.isLeft(v) ? {} : v.right),
    (v) => {
      if (typeof v !== 'object' || Array.isArray(v)) {
        return {}
      }
      return v
    },
  )

  providers.forEach((p) => {
    const providerStore = decode(p.storeType, data[p.id])
    const reactiveData = reactive(providerStore as any)
    p.storeWrapper.data = reactiveData
    data[p.id] = reactiveData
  })

  const coreStore = decode(core.storeType, data.core)
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
