import { VueConstructor } from 'vue'
import { PROVIDER } from '~/constants/constant'
import providerIcon from '~/constants/icon'
import { store } from '~/service/store'

export interface ProviderType {
  id: PROVIDER
  view: VueConstructor
  translate: (word: string, payload: any) => Promise<() => void>
}

export const getIcon = (provider: ProviderType) => {
  const key = store.config[provider.id].icon
  return (providerIcon[provider.id] as any)[key]
}
