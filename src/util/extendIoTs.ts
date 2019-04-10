import * as t from 'io-ts'

export class EnumType<A> extends t.Type<A> {
  public readonly _tag: 'EnumType' = 'EnumType'
  public enumObject!: object
  public constructor(e: object, name?: string) {
    super(
      name || 'enum',
      (u): u is A => Object.values(this.enumObject).some(v => v === u),
      (u, c) => (this.is(u) ? t.success(u) : t.failure(u, c)),
      t.identity,
    )
    this.enumObject = e
  }
}

/**
 * @param name - optional enum name
 */
export const createEnumType = <T>(e: object, name?: string) => new EnumType<T>(e, name);

(t as any).enumType = createEnumType
