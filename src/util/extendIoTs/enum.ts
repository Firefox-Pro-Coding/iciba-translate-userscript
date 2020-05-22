import {
  Type,
  success,
  failure,
  identity,
} from 'io-ts'

class EnumType<A> extends Type<A> {
  public readonly _tag: 'EnumType' = 'EnumType'
  public enumObject!: Record<string, string>
  public constructor(e: Record<string, string>, name?: string) {
    super(
      name ?? 'enum',
      (u): u is A => {
        if (!Object.values(this.enumObject).find((v) => v === u)) {
          return false
        }

        if (typeof (this.enumObject as any)[u as string] === 'number') {
          return false
        }

        return true
      },
      (u, c) => (this.is(u) ? success(u) : failure(u, c)),
      identity,
    )
    this.enumObject = e
  }
}

/**
 *
 * @param name - optional enum name
 */
export const enumType = <T>(e: Record<string, string>, name?: string) => new EnumType<T>(e, name)
