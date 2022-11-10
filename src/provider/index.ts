import { IcibaProvider } from './Iciba'
import { GoogleDictProvider } from './GoogleDict'
import { GoogleTranslateProvider } from './GoogleTranslate'
import { BaiduTranslateProvider } from './BaiduTranslate'
import { UrbanDictionaryProvider } from './UrbanDictionary'
import { VocabularyProvider } from './Vocabulary'
import { AliApiTranslateProvider } from './AliApiTranslate'
import { Provider } from './create'

export const providers = [
  IcibaProvider,
  GoogleDictProvider,
  GoogleTranslateProvider,
  BaiduTranslateProvider,
  UrbanDictionaryProvider,
  VocabularyProvider,
  AliApiTranslateProvider,
] as const

export const getIcon = (_provider: Provider<any> | string) => {
  const provider = typeof _provider === 'string'
    ? providers.find((v) => v.id === _provider)!
    : _provider

  const iconsKey = provider.store.icon as string
  return provider.icons[iconsKey]
}
