import { Either, left, right } from 'fp-ts/lib/Either'
import { IcibaExtendedGMOption, IcibaExtendedGMXMLHttpRequestResponse } from './types'

/* eslint-disable camelcase */
export const getValue = (name: string, def: string): Promise<string | number | boolean> => {
  if (GM?.getValue) {
    return Promise.resolve(GM.getValue(name, def) as Promise<string | number | boolean>)
  }
  if (GM_getValue) {
    return Promise.resolve(GM_getValue(name, def))
  }
  return Promise.resolve(def)
}

export const setValue = (name: string, value: string): Promise<void> => {
  if (GM?.setValue) {
    return Promise.resolve(GM.setValue(name, value))
  }
  if (GM_setValue) {
    GM_setValue(name, value)
    return Promise.resolve()
  }
  return Promise.resolve()
}

export class GMXMLError extends Error {
  public response!: GM.Response<unknown>

  public constructor(m: string, res?: GM.Response<unknown>) {
    super(m)
    if (res) {
      this.response = res
    }
  }
}


interface GotError {
  type: 'timeout' | 'error' | 'statuscode'
  res: GM.Response<unknown>
}
type GotReturnType<T> = Promise<Either<GotError, IcibaExtendedGMXMLHttpRequestResponse<T>>>
export const got = <T = unknown>(params: IcibaExtendedGMOption): GotReturnType<T> => {
  const api = GM?.xmlHttpRequest ?? GM_xmlhttpRequest

  if (!api) {
    throw new Error('not running in greasymonkey or tampermonkey enviroment')
  }

  return new Promise((rs) => {
    const option: IcibaExtendedGMOption = {
      timeout: 10000,
      ontimeout: (res) => rs(left({ type: 'timeout', res })),
      onerror: (res) => rs(left({ type: 'error', res })),
      onload: (res) => {
        if (res.status < 200 || res.status >= 300) {
          rs(left({ type: 'statuscode', res }))
        }
        rs(right(res as IcibaExtendedGMXMLHttpRequestResponse<T>))
      },
      ...params,
    }
    api(option as any)
  })
}

export const registerMenuCommand = (name: string, fn: () => unknown) => {
  if (GM_registerMenuCommand) {
    GM_registerMenuCommand(name, fn)
  }
}
