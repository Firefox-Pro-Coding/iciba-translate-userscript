export interface ToastParams {
  text: string
  timeout?: number
}

export interface ToastItem {
  id: number
  text: string
  timeout: number
  destroy: () => void
}

export interface ToastFunction {
  (p: ToastParams): void
  (text: string, timeout?: number): void
}
