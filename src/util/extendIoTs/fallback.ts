/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line max-classes-per-file
import {
  Type,
  success,
  type,
} from 'io-ts'

import { isLeft, isRight } from 'fp-ts/lib/Either'

export class FallbackType<T> extends Type<T> {
  public defaultValue: T

  public constructor(p: Type<T>, defaultValue: T) {
    super(
      p.name,
      (_u): _u is T => true,
      (u, c) => {
        const report = p.validate(u, c)
        if (isRight(report)) {
          return report
        }
        return success(
          typeof this.defaultValue === 'function'
            ? this.defaultValue()
            : this.defaultValue,
        )
      },
      p.encode,
    )
    this.defaultValue = defaultValue
  }

  public get defaultData() {
    const data: T = typeof this.defaultValue === 'function'
      ? this.defaultValue()
      : this.defaultValue
    return data
  }
}

export const fallback = <T extends any>(p: Type<T>, dValue: T | (() => T)) => new FallbackType<T>(
  p, typeof dValue === 'function' ? (dValue as () => T)() : dValue,
)

export type FallbackProps = Record<string, FallbackType<any> | FallbackInterface<any>>

export type FallBackInterfaceType<P extends FallbackProps> = {
  [k in keyof P]: P[k] extends FallbackType<unknown> ? P[k]['_A'] : P[k]['_A']
}

export class FallbackInterface<
  P extends FallbackProps,
  T = FallBackInterfaceType<P>,
> extends Type<T> {
  private p: P

  public constructor(p: P) {
    const tp = type(p)

    super(
      '',
      (_u): _u is T => true,
      (u, c) => {
        const report = tp.validate(u, c)
        if (isLeft(report)) {
          const data = Object.fromEntries(
            Object.entries(p).map(([k, v]) => [k, v.defaultData]),
          )
          return success(data as any)
        }
        return report
      },
      tp.encode as any,
    )

    this.p = p
  }

  public get defaultData() {
    const data: T = Object.fromEntries(
      Object.entries(this.p).map(([k, v]) => [k, v.defaultData]),
    ) as any
    return data
  }
}

export const fallbackInterface = <P extends FallbackProps>(t: P) => new FallbackInterface(t)
