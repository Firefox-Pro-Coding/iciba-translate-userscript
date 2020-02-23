import { VueConstructor } from 'vue'
import { PROVIDER } from '~/constants/constant'
import providerIcon from '~/constants/icon'
import { store } from '~/service/store'

export interface ProviderType {
  id: PROVIDER
  view: VueConstructor
  translate: (word: string, payload: any) => Promise<() => void>
}

export const getIcon = (provider: ProviderType | PROVIDER) => {
  const id = typeof provider === 'string'
    ? provider
    : provider.id
  const key = store.config[id].icon
  return (providerIcon[id] as any)[key] as string
}
