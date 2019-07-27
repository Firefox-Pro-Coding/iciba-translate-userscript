import querystring from 'querystring'
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

const getToken = (ig: string, iid: string): Promise<VoiceToken> => {
  if (data.ig === ig && data.iid === iid) {
    return Promise.resolve(data.token)
  }
  const query = querystring.stringify({
    isVertical: '1',
    IG: ig,
    IID: iid,
  })
  return got({
    method: 'POST',
    url: `https://cn.bing.com/tfetspktok?${query}`,
    responseType: 'json',
  }).then((res) => {
    data.ig = ig
    data.iid = iid
    data.token = res.response
    return res.response as VoiceToken
  })
}
export default getToken
