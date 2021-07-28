import {
  Type,
  success,
  failure,
  identity,
} from 'io-ts'
import { providers } from '~/provider'

class ProviderType extends Type<string> {
  public readonly _tag: 'EnumType' = 'EnumType'
  public constructor() {
    super(
      'provider',
      (u): u is string => providers.some((v) => v.id === u),
      (u, c) => (this.is(u) ? success(u) : failure(u, c)),
      identity,
    )
  }
}

export const providerType = new ProviderType()
