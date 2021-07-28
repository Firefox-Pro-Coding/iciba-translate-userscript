import { Component } from 'vue'
import { Either } from 'fp-ts/lib/Either'
import { Any, TypeOf } from 'io-ts'

export interface TranslateErr {
  message?: string
  // Provider.id
  redirect?: string
  redirectParams?: any
}

export interface ProviderInit<S extends Any = Any, ST = TypeOf<S>> {
  id: string
  label: string
  translate: (p: { word: string, payload?: any }) => Promise<Either<TranslateErr, () => unknown>>
  translateView: Component
  settingView: Component
  storeWrapper: { data: ST }
  storeType: S
  defaultStore: ST
  icons: Record<string, string>
}

export interface Provider<S extends Any = Any> extends ProviderInit<S>{
  readonly store: TypeOf<S>
}

export const createProvider = <S extends Any>(params: ProviderInit<S>): Provider<S> => ({
  ...params,
  get store() {
    return this.storeWrapper.data
  },
})
