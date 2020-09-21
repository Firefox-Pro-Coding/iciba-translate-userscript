import { defineComponent } from 'vue'
import { Either } from 'fp-ts/lib/Either'
import { PROVIDER } from '~/constants/constant'
import providerIcon from '~/constants/icon'
import { store } from '~/service/store'

interface TranslateErr {
  message?: string
  redirect?: PROVIDER
  redirectParams?: any
}

export interface ProviderType {
  id: PROVIDER
  view: ReturnType<typeof defineComponent>
  translate: (word: string, payload: any) => Promise<Either<TranslateErr, () => unknown>>
}

export const getIcon = (provider: ProviderType | PROVIDER) => {
  const id = typeof provider === 'string'
    ? provider
    : provider.id
  const key = store.config[id].icon
  return (providerIcon[id] as any)[key] as string
}
