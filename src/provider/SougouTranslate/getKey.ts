import { got } from '~/util/gmapi'

const getKey = async () => {
  const sougouFanyiRes = await got({
    method: 'GET',
    url: 'https://fanyi.sogou.com/logtrace',
    headers: {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'DNT': '1',
      'Host': 'fanyi.sogou.com',
      'Pragma': 'no-cache',
      'Referer': 'https://fanyi.sogou.com/',
      // 'Sec-Fetch-Mode': 'no-cors',
      // 'Sec-Fetch-Site': 'same-origin',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
    },
    timeout: 5000,
  })
  const seccodeMatch = sougouFanyiRes.responseText.match(/'([a-f0-9]+)'\+'([a-f0-9]+)'/)
  if (!seccodeMatch) {
    throw new Error('解析出错！')
  }
  return seccodeMatch[1] + seccodeMatch[2]
}

export default getKey
