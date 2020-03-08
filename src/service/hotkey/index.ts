const normalizeKey = (key: string) => (
  key >= 'a' && key <= 'z'
    ? key.toUpperCase()
    : key
)

type HotKeyHandler = (keys: Array<string>, e: MouseEvent) => unknown

const useHotkeyService = () => {
  const listeners = new Set<HotKeyHandler>()
  const keys = [] as Array<string>
  let mouseEvent: MouseEvent | null

  const handleClear = () => {
    keys.length = 0
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = normalizeKey(e.key)
    if (!e.repeat && !keys.includes(key)) {
      keys.push(key)
      if (mouseEvent) {
        Array.from(listeners).forEach((v) => v([...keys], mouseEvent!))
      }
    }
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    const key = normalizeKey(e.key)
    if (keys.includes(key)) {
      keys.splice(keys.indexOf(key), 1)
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    mouseEvent = e
  }

  const list = [
    ['keydown', handleKeyDown],
    ['keyup', handleKeyUp],
    ['blur', handleClear],
    ['focus', handleClear],
    ['mousemove', handleMouseMove],
  ] as const

  list.forEach((v) => {
    window.addEventListener(v[0], v[1] as any)
  })

  const onHotkeyPress = (fn: HotKeyHandler) => {
    listeners.add(fn)
  }

  const offHotkeyPress = (fn: HotKeyHandler) => {
    listeners.delete(fn)
  }

  const match = (k1: Array<string>, k2: Array<string>) => k1.length === k2.length && k1.every((k) => k2.includes(k))

  return {
    onHotkeyPress,
    offHotkeyPress,
    match,
  }
}

export const hotkeyService = useHotkeyService()
