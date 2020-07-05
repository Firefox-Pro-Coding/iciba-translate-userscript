import {
  getValue,
  setValue,
} from '~/util/gmapi'

interface SeccodeStore {
  seccode: number
  time: number
}

const SOUGOU_SECCODE_KEY = 'sougou_seccode'

const parseKey = async (): Promise<string> => {
  const dataString = await getValue(SOUGOU_SECCODE_KEY, '') as string
  if (!dataString) {
    return ''
  }

  let data: SeccodeStore | null = null
  try {
    data = JSON.parse(dataString)
  } catch (e) {
    return ''
  }

  if (data?.seccode && Date.now() - data.time < 1000 * 60 * 60) {
    return data.seccode.toString()
  }

  return ''
}

// it's unable to get https://fanyi.sogou.com/logtrace content
// by using just browser apis, it checks src-fetch-mode which
// cannot be override.
// using iframe to load sougou fanyi and get key inside the page
const pullForKey = (): Promise<string> => {
  const iframe = document.createElement('iframe')
  iframe.src = 'https://fanyi.sogou.com/'
  iframe.style.display = 'none'

  document.body.append(iframe)

  return new Promise<string>((rs) => {
    const pullInterval = window.setInterval(async () => {
      const key = await parseKey()
      if (key) {
        rs(key.toString())
        window.clearInterval(pullInterval)
      }
    }, 200)
  })
}

const getKey = async () => {
  const key = await parseKey()
  if (key) {
    return key
  }
  return pullForKey()
  // const sougouFanyiRes = await got({
  //   method: 'GET',
  //   url: 'https://fanyi.sogou.com/logtrace',
  //   headers: {
  //     'Accept': '*/*',
  //     'Accept-Encoding': 'gzip, deflate, br',
  //     'DNT': '1',
  //     'Host': 'fanyi.sogou.com',
  //     'Pragma': 'no-cache',
  //     'Referer': 'https://fanyi.sogou.com/',
  //     'Sec-Fetch-Mode': 'no-cors',
  //     'Sec-Fetch-Site': 'same-origin',
  //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
  //   },
  //   timeout: 5000,
  // })
  // const seccodeMatch = sougouFanyiRes.responseText.match(/'([a-f0-9]+)'\+'([a-f0-9]+)'/)
  // if (!seccodeMatch) {
  //   throw new Error('解析出错！')
  // }
  // return seccodeMatch[1] + seccodeMatch[2]
}

// set up seccode report hook
const init = () => {
  if (unsafeWindow.location.origin !== 'https://fanyi.sogou.com') {
    return
  }
  unsafeWindow.addEventListener('load', () => {
    try {
      const seccode = (unsafeWindow as any).__INITIAL_STATE__.CONFIG.secretCode as number
      setValue(SOUGOU_SECCODE_KEY, JSON.stringify({
        seccode,
        time: Date.now(),
      }))
    } catch (e) {
      //
    }
  })
}

init()

export default getKey
