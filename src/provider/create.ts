import { Component } from 'vue'
import { Either } from 'fp-ts/lib/Either'
import { FallbackInterface, FallBackInterfaceType, FallbackProps } from '~/util/extendIoTs/fallback'

export interface TranslateErr {
  message?: string
  // Provider.id
  redirect?: string
  redirectParams?: any
}

export interface ProviderInit<
  P extends FallbackProps = FallbackProps,
  S = FallbackInterface<P>,
  ST = FallBackInterfaceType<P>,
> {
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

// eslint-disable-next-line @typescript-eslint/ban-types
export interface Provider<P extends FallbackProps = {}> extends ProviderInit<P>{
  readonly store: FallBackInterfaceType<P>
}

export const createProvider = <
  P extends FallbackProps,
  S extends FallbackInterface<P>,
>(params: ProviderInit<P, S>): Provider<P> => ({
  ...params,
  get store() {
    return this.storeWrapper.data
  },
})
