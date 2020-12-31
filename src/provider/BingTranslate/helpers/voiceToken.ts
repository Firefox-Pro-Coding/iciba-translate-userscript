import { stringify } from 'querystring'
import { isLeft } from 'fp-ts/lib/Either'
import { got } from '~/util/gmapi'

interface VoiceToken {
  expiry: string
  region: string
  token: string
}

const data = {
  ig: '',
  iid: '',
  token: {} as any as VoiceToken,
}

const getToken = async (ig: string, iid: string): Promise<VoiceToken> => {
  if (data.ig === ig && data.iid === iid) {
    return data.token
  }
  const query = stringify({
    isVertical: '1',
    IG: ig,
    IID: iid,
  })
  const res = await got<any>({
    method: 'POST',
    url: `https://cn.bing.com/tfetspktok?${query}`,
    responseType: 'json',
  })

  if (isLeft(res)) {
    throw new Error(res.left.type)
  }

  data.ig = ig
  data.iid = iid
  data.token = res.right.response
  return res.right.response as VoiceToken
}
export default getToken
