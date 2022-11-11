import { isLeft, left, right } from 'fp-ts/Either'
import { encode } from 'base64-arraybuffer'
import md5 from 'md5'
import { v4 as randomUUID } from 'uuid'

import { got } from '~/util/gmapi'
import containerData from '~/provider/AliApiTranslate/container/data'

import { store } from '~/provider/AliApiTranslate/store'
import { AliApiTranslateParams, AliApiTranslateResult } from '~/provider/AliApiTranslate/types'

const hexToUint8Array = (hexString: string) => Uint8Array
  .from(
    hexString.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)),
  )

const MD5Base64 = (str: string) => {
  if (str === '') {
    return ''
  }
  const md5Hex = md5(str)
  const md5Uint8Arr = hexToUint8Array(md5Hex)
  const md5Base64 = encode(md5Uint8Arr)
  return md5Base64
}

const HMACSha1 = async (str: string, key: string) => {
  if (str === '') {
    return ''
  }
  const keyUint8Arr = new TextEncoder().encode(key)
  const singingKey = await window.crypto.subtle.importKey(
    'raw',
    keyUint8Arr,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign'],
  )
  const dataUint8Arr = new TextEncoder().encode(str)
  const signUint8Arr = await window.crypto.subtle.sign('HMAC', singingKey, dataUint8Arr)
  const sign2 = encode(signUint8Arr)

  return sign2
}

function trimIndent(str: string) {
  return str.split('\n').map((s) => s.trim()).join('\n')
}

const doRequest = async (body: string, appId: string, appKey: string) => {
  const apiDomain = 'mt.aliyuncs.com'
  const apiPath = '/api/translate/web/general'

  const method = 'POST'
  const accept = 'application/json'
  const contentType = 'application/json; charset=UTF-8'
  // const date = formatInTimeZone(new Date(), 'Etc/GMT+0', 'E, dd MMM yyyy HH:mm:ss z', { locale: enUS })
  const date = new Date().toUTCString()
  const uuid = randomUUID()
  const version = '2019-01-02'

  const bodyMD5 = MD5Base64(body)
  const stringToSign = `${method}
    ${accept}
    ${bodyMD5}
    ${contentType}
    ${date}
    x-acs-signature-method:HMAC-SHA1
    x-acs-signature-nonce:${uuid}
    x-acs-version:${version}
    ${apiPath}`
  const signature = await HMACSha1(trimIndent(stringToSign), appKey)
  const authorization = `acs ${appId}:${signature}`

  const sendPost = async () => {
    const response = await got<any>({
      url: `https://${apiDomain}${apiPath}`,
      method,
      headers: {
        'Accept': accept,
        'Content-Type': contentType,
        'Content-MD5': bodyMD5,
        'Date': date,
        'Host': apiDomain,
        'Authorization': authorization,
        'x-acs-signature-nonce': uuid,
        'x-acs-signature-method': 'HMAC-SHA1',
        'x-acs-version': version,
        'Accept-Encoding': 'gzip',
      },
      data: body,
      timeout: 5000,
    } as any)

    if (isLeft(response)) {
      throw new Error(response.left.type)
    }

    const result: AliApiTranslateResult = JSON.parse(response.right.responseText)
    if (result.Code === '200') {
      return right(result)
    }
    return left({
      type: 'unknown',
      res: response.right,
    })
  }

  const result = await sendPost()
  if (isLeft(result)) {
    throw new Error(result.left.type)
  }

  return result.right
}

const getAliApiTranslateResult = async (p: AliApiTranslateParams, sl: string, tl: string) => {
  const appId = store.data.appId
  const appKey = store.data.appKey

  const body = JSON.stringify({
    'FormatType': 'text',
    'SourceLanguage': sl,
    'TargetLanguage': tl,
    'SourceText': p.word,
    'Scene': 'general',
  })

  return doRequest(body, appId, appKey)
}

export const translate = async (p: AliApiTranslateParams) => {
  try {
    const auto = !p.payload || p.payload.sl === 'auto'
    const sl = p.payload?.sl ?? 'auto'
    const tl = p.payload?.tl ?? store.data.targetLanguage
    const data = await getAliApiTranslateResult(p, sl, tl)

    return right(() => {
      containerData.data = data
      containerData.inputText = p.word
      containerData.autoMode = auto
      containerData.sourceLanguage = sl
      containerData.targetLanguage = tl
    })
  } catch (e: any) {
    return left({
      message: e.message,
    })
  }
}
