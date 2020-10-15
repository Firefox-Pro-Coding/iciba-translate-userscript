import {
  Type,
  success,
  InterfaceType,
} from 'io-ts'

import { isRight } from 'fp-ts/lib/Either'

export class FallbackType<T> extends Type<T> {
  public d: T

  public constructor(p: Type<T>, d: T) {
    super(
      p.name,
      (_u): _u is T => true,
      (u, c) => {
        const report = p.validate(u, c)
        if (isRight(report)) {
          return report
        }
        return success(d)
      },
      p.encode,
    )
    this.d = d
  }
}

export const fallback = <T extends any>(p: Type<T>, dValue: T | (() => T)) => new FallbackType<T>(
  p, typeof dValue === 'function' ? (dValue as () => T)() : dValue,
)

type FallbackProps = Record<string, FallbackType<any>>

type GetFallback = <P extends FallbackProps>(t: InterfaceType<P>) => {
  [k in keyof P]: P[k]['d']
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const getFallbackData: GetFallback = (t) => Object.fromEntries(Object.entries(t.props).map(([k, v]) => [k, v.d])) as any
