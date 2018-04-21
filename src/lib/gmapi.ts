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
    return Promise.resolve(GM_setValue(name, value))
  }
  return Promise.resolve()
}

interface IExtendedGMOption extends GMXMLHttpRequestOptions {
  responseType?: string
}

export const got = (params: IExtendedGMOption): Promise<string> => {
  const api = GM.xmlHttpRequest || GM_xmlhttpRequest

  if (!api) {
    throw new Error('not running in greasymonkey or tampermonkey enviroment')
  }

  return new Promise<string>((rs, rj) => {
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
      onload(theResponse) {
        const response = theResponse as any // tslint:disable-line
        if (response.status !== 200) {
          rj(new Error('网络错误！'))
        }
        if (params.responseType === 'blob') {
          rs(response.response)
        } else {
          rs(response.responseText)
        }
      },
      ...params,
    }
    api(option as any)
  })
}
