import { stringify } from 'querystring'

import { got } from '~/util/gmapi'
import copy from '~/util/copy'
import { PROVIDER } from '~/constants/constant'

import { ProviderType } from '../provider'
import UrbanDictionaryContainer from './container/UrbanDictionary.vue'
import containerData from './containerData'
import { UrbanDictionaryResult } from './type'

const useUrbanDictionaryProvider = (): ProviderType => {
  const translate = async (word: string) => {
    /* https://api.urbandictionary.com/v0/define?term={word} */
    const url = `https://api.urbandictionary.com/v0/define?${stringify({ term: word })}`

    const response = await got({
      method: 'GET',
      url,
      timeout: 5000,
    })
    const result: UrbanDictionaryResult = JSON.parse(response.responseText)

    return () => {
      containerData.data = copy(result)
    }
  }
  return {
    id: PROVIDER.URBAN_DICTIONARY,
    view: UrbanDictionaryContainer,
    translate,
  }
}

export const urbanDictionary = useUrbanDictionaryProvider()
