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

export const got = (params) => {
  const api = GM.xmlHttpRequest || GM_xmlhttpRequest

  if (!api) {
    throw new Error('not running in greasymonkey or tampermonkey enviroment')
  }
  return new Promise<string>((rs, rj) => {
    api({
      method: 'GET',
      url: '',
      timeout: 10000,
      d: '',
      ontimeout() {
        rj(new Error('网络超时！'))
      },
      onerror() {
        rj(new Error('网络错误！'))
      },
      onload(response) {
        if (response.status !== 200) {
          rj(new Error('网络错误！'))
        }
        rs(response.responseText)
      },
      ...params,
    })
  })
}
