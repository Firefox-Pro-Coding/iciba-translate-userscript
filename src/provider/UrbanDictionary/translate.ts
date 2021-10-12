import { stringify } from 'querystring'
import { isLeft, left, right } from 'fp-ts/lib/Either'

import { got } from '~/util/gmapi'
import copy from '~/util/copy'

import containerData from './container/data'
import { UrbanDictionaryResult } from './types'

interface UrbanDictionaryParams {
  word: string
}

export const translate = async ({ word }: UrbanDictionaryParams) => {
  try {
    /* https://api.urbandictionary.com/v0/define?term={word} */
    const url = `https://api.urbandictionary.com/v0/define?${stringify({ term: word })}`

    const response = await got({
      method: 'GET',
      url,
      timeout: 5000,
    })

    if (isLeft(response)) {
      throw new Error(response.left.type)
    }

    const result: UrbanDictionaryResult = JSON.parse(response.right.responseText)

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line
      const check = require('./types/check').check as (...args: Array<any>) => unknown
      check(result)
    }

    return right(() => {
      containerData.data = copy(result)
    })
  } catch (e: any) {
    return left({
      message: e.message,
    })
  }
}
