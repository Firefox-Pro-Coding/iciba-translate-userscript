import querystring from 'querystring'

import { got } from '~/util/gmapi'
import copy from '~/util/copy'

import { PROVIDER } from '~/constants/constant'

import AbstractTranslateProvider from '../AbstractTranslateProvider'
import UrbanDictionaryContainer from './container/UrbanDictionary.vue'
import containerData from './containerData'

import { UrbanDictionaryResult } from './type'

class UrbanDictionaryProvider extends AbstractTranslateProvider {
  public uniqName = PROVIDER.URBAN_DICTIONARY
  public containerComponentClass = UrbanDictionaryContainer

  public async translate(word: string) {
    /* https://api.urbandictionary.com/v0/define?term={word} */
    const url = `https://api.urbandictionary.com/v0/define?${querystring.stringify({ term: word })}`

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
}

export default new UrbanDictionaryProvider()
