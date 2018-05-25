import {
  Provider,
  BaseSetting,
} from './types'

interface Store {
  provider: Provider
  core: BaseSetting
}

const stateProvider: Provider = {} as any
const stateCore: BaseSetting = {} as any

const store: Store = {
  provider: stateProvider,
  core: stateCore,
}

// const providerProxyHandler: ProxyHandler<Store> = {
//   get(target, prop: string) {
//     if (prop === 'provider') {
//       //
//     } else if (prop === 'core') {
//       //
//     }
//     throw new Error(`${prop} is not existed on store`)
//   },
//   set(target, prop, value) {
//     if (prop === 'provider') {
//       target[prop] = value
//     } else if (prop === 'core') {
//       target[prop] = value
//     } else {
//       return false
//     }
//     return true
//   },
// }

const providerProxy = new Proxy<Store>(store, providerProxyHandler)

export default providerProxy
