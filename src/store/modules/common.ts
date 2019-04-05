import * as t from 'io-ts'

enum DEFAULT_PROVIDER {
  ICIBA = 'ICIBA',
  GOOGLE_DICT = 'GOOGLE_DICT',
}

export const type = t.type({
  defaultProvider: t.enumType<DEFAULT_PROVIDER>(DEFAULT_PROVIDER, 'DEFAULT_PROVIDER'),
  pressCtrlToDrag: t.boolean,
})

export const defaultData: t.TypeOf<typeof type> = {
  defaultProvider: DEFAULT_PROVIDER.ICIBA,
  pressCtrlToDrag: false,
}
