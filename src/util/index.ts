type SetLoading = (l: boolean) => unknown
type UnknownFunction = (...p: Array<any>) => unknown
type RunLoading = <T extends UnknownFunction>(s: SetLoading, fn: T) => Promise<ReturnType<T>>
/**
 * 立即执行异步函数 fn。
 * 执行前调用 setLoading(true)，执行完毕调用 setLoading(false)
 */
export const runLoading: RunLoading = async (setLoading, fn) => {
  setLoading(true)
  try {
    const result = await fn()
    return result as ReturnType<typeof fn>
  } finally {
    setLoading(false)
  }
}
