const store: Record<string, string> = {}

export const getValue = jest.fn((k: string, d: string) => store[k] ?? d)
export const setValue = jest.fn((k: string, v: string) => { store[k] = v })
export const got = jest.fn()
export const registerMenuCommand = jest.fn()
