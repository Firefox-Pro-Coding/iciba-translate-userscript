import * as querystring from 'querystring'

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
  public settingDescriptor = []

  public async translate(word: string) {
    /* http://api.urbandictionary.com/v0/define?term={word} */
    const url = `http://api.urbandictionary.com/v0/define?${querystring.stringify({ term: word })}`

    let result: UrbanDictionaryResult
    try {
      const response = await got({
        method: 'GET',
        url,
        timeout: 5000,
      })
      result = JSON.parse(response.responseText)
    } catch (e) {
      throw e
    }

    return () => {
      containerData.data = copy(result)
    }
  }
}

export default new UrbanDictionaryProvider()
