/* eslint-disable camelcase */
export const getValue = (name: string, def: string): Promise<string> => {
  if (GM.getValue) {
    return Promise.resolve(GM.getValue(name, def))
  }
  if (GM_getValue) {
    return Promise.resolve(GM_getValue(name, def))
  }
  return Promise.resolve(def)
}

export const setValue = (name: string, value: string): Promise<void> => {
  if (GM.setValue) {
    return Promise.resolve(GM.setValue(name, value))
  }
  if (GM_setValue) {
    GM_setValue(name, value)
    return Promise.resolve()
  }
  return Promise.resolve()
}

interface IExtendedGMOption extends GMXMLHttpRequestOptions {
  responseType?: string
}

interface IExtendedGMXMLHttpRequestResponse extends GMXMLHttpRequestResponse {
  response: any
}

export const got = (params: IExtendedGMOption) => {
  const api = GM.xmlHttpRequest || GM_xmlhttpRequest

  if (!api) {
    throw new Error('not running in greasymonkey or tampermonkey enviroment')
  }

  return new Promise<IExtendedGMXMLHttpRequestResponse>((rs, rj) => {
    const option: IExtendedGMOption = {
      method: 'GET',
      url: '',
      timeout: 10000,
      ontimeout(e) {
        rj(e)
      },
      onerror(e) {
        rj(e)
      },
      onload(response) {
        if (response.status !== 200) {
          rj(new Error('网络错误！'))
        }
        rs(response as IExtendedGMXMLHttpRequestResponse)
      },
      ...params,
    }
    api(option as any)
  })
}
