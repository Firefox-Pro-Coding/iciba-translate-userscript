/* eslint-disable camelcase */
export const getValue = (name: string, def: string): Promise<string | number | boolean> => {
  if (typeof GM !== 'undefined' && GM.getValue) {
    return Promise.resolve(GM.getValue(name, def) as Promise<string | number | boolean>)
  }
  if (GM_getValue) {
    return Promise.resolve(GM_getValue(name, def))
  }
  return Promise.resolve(def)
}

export const setValue = (name: string, value: string): Promise<void> => {
  if (typeof GM !== 'undefined' && GM.setValue) {
    return Promise.resolve(GM.setValue(name, value))
  }
  if (GM_setValue) {
    GM_setValue(name, value)
    return Promise.resolve()
  }
  return Promise.resolve()
}

interface IcibaExtendedGMOption extends GM.Request {
  responseType?: string
  anonymous?: boolean
}

type IfEquals<A, B, X, Y> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? X : Y

interface IcibaExtendedGMXMLHttpRequestResponse<T = unknown> extends GM.Response<unknown> {
  response: IfEquals<T, unknown, unknown, T>
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

export const got = <T = unknown>(params: IcibaExtendedGMOption) => {
  let api: typeof GM_xmlhttpRequest | typeof GM.xmlHttpRequest

  if (typeof GM !== 'undefined' && GM.xmlHttpRequest) {
    api = GM.xmlHttpRequest
  } else {
    api = GM_xmlhttpRequest
  }

  if (!api) {
    throw new Error('not running in greasymonkey or tampermonkey enviroment')
  }

  return new Promise<IcibaExtendedGMXMLHttpRequestResponse<T>>((rs, rj) => {
    const option: IcibaExtendedGMOption = {
      timeout: 10000,
      ontimeout(res) {
        const error = new GMXMLError('timeout exceeded', res)
        rj(error)
      },
      onerror(res) {
        const error = new GMXMLError(`request failed ${res.status} ${res.statusText}`, res)
        rj(error)
      },
      onload(response) {
        if (response.status < 200 || response.status >= 300) {
          const err = new GMXMLError(`response with status code ${response.status}`, response)
          rj(err)
        }
        rs(response as IcibaExtendedGMXMLHttpRequestResponse<T>)
      },
      ...params,
    }
    api(option as any)
  })
}

export const registerMenuCommand = (name: string, fn: () => unknown) => {
  if (typeof GM_registerMenuCommand !== 'undefined') {
    GM_registerMenuCommand(name, fn)
  }
}
