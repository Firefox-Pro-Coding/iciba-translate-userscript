import { got } from '~/util/gmapi'

const getKey = async () => {
  const sougouFanyiRes = await got({
    method: 'GET',
    url: 'https://fanyi.sogou.com/',
    timeout: 5000,
  })
  const jsUrlMatch = sougouFanyiRes.responseText.match(/\/\/(dlweb\.sogoucdn\.com\/translate\/pc\/static\/js\/app\.[a-z0-9]{4,12}\.js)/)
  if (!jsUrlMatch) {
    throw new Error('解析出错！')
  }
  const jsUrl = jsUrlMatch[1]

  const jsRes = await got({
    method: 'GET',
    url: `https://${jsUrl}`,
    timeout: 5000,
  })
  const keyMatch = jsRes.responseText.match(/"([a-z0-9]{32})"/)
  if (!keyMatch) {
    throw new Error('解析出错！')
  }
  const key = keyMatch[1]
  return key
}

export default getKey
