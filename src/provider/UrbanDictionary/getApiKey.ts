import { isLeft } from 'fp-ts/lib/Either'
import { cachePromiseHof } from '~/util/cachePromise'
import { got } from '~/util/gmapi'

export const apiKeyState = {
  apiKey: '',
}

export const getApiKey = cachePromiseHof(async () => {
  if (apiKeyState.apiKey) {
    return
  }

  const res = await got({
    method: 'GET',
    url: 'https://www.urbandictionary.com/',
    timeout: 5000,
  })

  if (isLeft(res)) {
    throw new Error(res.left.type)
  }
  const apiKeyMatch = /"api_key":"([0-9a-f]{32})"/.exec(res.right.responseText)

  if (!apiKeyMatch) {
    return
  }

  apiKeyState.apiKey = apiKeyMatch[1]
})
