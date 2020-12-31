import { stringify } from 'querystring'
import { isLeft, left, right } from 'fp-ts/lib/Either'

import { got } from '~/util/gmapi'
import copy from '~/util/copy'
import { PROVIDER } from '~/constants'

import { ProviderType } from '../provider'
import UrbanDictionaryContainer from './container/UrbanDictionary.vue'
import containerData from './containerData'
import { UrbanDictionaryResult } from './types'
import { check } from './check'

const translate: ProviderType['translate'] = async (word: string) => {
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
      check(result)
    }

    return right(() => {
      containerData.data = copy(result)
    })
  } catch (e) {
    return left({
      message: e.message,
    })
  }
}

export const urbanDictionary: ProviderType = {
  id: PROVIDER.URBAN_DICTIONARY,
  view: UrbanDictionaryContainer,
  translate,
}
