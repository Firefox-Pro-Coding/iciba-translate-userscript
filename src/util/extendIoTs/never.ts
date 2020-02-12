import {
  Type,
  failure,
} from 'io-ts'

export class NeverType extends Type<any> {
  public readonly _tag: 'NeverType' = 'NeverType'
  public constructor() {
    super(
      'never',
      (_): _ is never => false,
      (u, c) => failure(u, c),
      /* istanbul ignore next */
      () => {
        throw new Error('cannot encode never')
      },
    )
  }
}

export const neverType = new NeverType()
