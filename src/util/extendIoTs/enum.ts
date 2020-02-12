import {
  Type,
  success,
  failure,
  identity,
} from 'io-ts'

class EnumType<A> extends Type<A> {
  public readonly _tag: 'EnumType' = 'EnumType'
  public enumObject!: object
  public constructor(e: object, name?: string) {
    super(
      name ?? 'enum',
      (u): u is A => Object.values(this.enumObject).some((v) => v === u),
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
export const enumType = <T>(e: object, name?: string) => new EnumType<T>(e, name)
