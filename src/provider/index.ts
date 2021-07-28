import { IcibaProvider } from './Iciba'
import { GoogleDictProvider } from './GoogleDict'
import { GoogleTranslateProvider } from './GoogleTranslate'
import { BaiduTranslateProvider } from './BaiduTranslate'
import { UrbanDictionaryProvider } from './UrbanDictionary'
import { VocabularyProvider } from './Vocabulary'
import { Provider } from './create'

export const providers = [
  IcibaProvider,
  GoogleDictProvider,
  GoogleTranslateProvider,
  BaiduTranslateProvider,
  UrbanDictionaryProvider,
  VocabularyProvider,
] as const

export const getIcon = (_provider: Provider | string) => {
  const provider = typeof _provider === 'string'
    ? providers.find((v) => v.id === _provider)!
    : _provider

  const iconsKey = provider.store.icon as string
  return provider.icons[iconsKey]
}
