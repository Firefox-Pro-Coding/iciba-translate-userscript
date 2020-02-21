import { got } from '~/util/gmapi'
import copy from '~/util/copy'

import AbstractTranslateProvider from '../AbstractTranslateProvider'
import IcibaContainer from './container/VocabularyContainer.vue'
import containerData from './containerData'

import { PROVIDER } from '~/constants/constant'
import { ExampleResult } from './types'

/*
https://audio.vocab.com/1.0/us/B/RQGAHF8JUGF9.mp3
https://audio.vocab.com/1.0/us/${data-audio}.mp3
*/

const nonNull = <T>(p: T | undefined | null) => {
  if (!p) {
    throw new Error()
  }
  return p as any as T
}

class VocabularyProvider extends AbstractTranslateProvider {
  public uniqName = PROVIDER.VOCABULARY
  public containerComponentClass = IcibaContainer

  public async translate(word: string, _payload: unknown) {
    const autocomplete = await this.getAutocomplete(word)
    const newWord = autocomplete[0].word
    const definition = await this.getDefinition(newWord)
    return () => {
      containerData.data = copy({
        word: newWord,
        autocomplete,
        definition,
      })
    }
  }

  public async getAutocomplete(word: string) {
    const result = await got<string>({
      method: 'GET',
      url: `https://www.vocabulary.com/dictionary/autocomplete?search=${encodeURIComponent(word)}`,
      headers: {
        'Accept': '*/*',
        'Host': 'www.vocabulary.com',
      },
    })

    const html = result.responseText
    const div = document.createElement('div')
    div.innerHTML = html
    const data = Array.from(div.querySelectorAll('.suggestions > li')).map((li) => ({
      lang: li.getAttribute('lang') ?? '',
      synsetid: li.getAttribute('synsetid') ?? '',
      word: li.getAttribute('word') ?? '',
      freq: li.getAttribute('freq') ?? '',
    }))
    return data
  }

  public async getExamples(word: string) {
    const result = await got<ExampleResult>({
      method: 'GET',
      url: `https://corpus.vocabulary.com/api/1.0/examples.json?query=${encodeURIComponent(word)}&maxResults=24&startOffset=0&filter=0`,
      responseType: 'json',
      headers: {
        'Accept': '*/*',
        'Host': 'www.vocabulary.com',
      },
    })

    const data = result.response
    return data
  }

  public async getDefinition(word: string) {
    const result = await got<string>({
      method: 'GET',
      url: `https://www.vocabulary.com/dictionary/definition.ajax?search=${encodeURIComponent(word)}&lang=en`,
      headers: {
        'Accept': '*/*',
        'Host': 'www.vocabulary.com',
      },
    })

    const html = result.responseText
    const div = document.createElement('div')
    div.innerHTML = html

    const data = {
      short: div.querySelector('.definitionsContainer .section.blurb .short')?.textContent?.trim() ?? undefined,
      long: div.querySelector('.definitionsContainer .section.blurb .long')?.textContent?.trim() ?? undefined,
      audio: nonNull(div.querySelector('.dynamictext .audio')).getAttribute('data-audio'),
      groups: Array.from(div.querySelectorAll('.definitions .section.definition .group')).map((group, index) => ({
        index,
        group: Array.from(group.querySelectorAll('.ordinal .sense')).map((sense) => ({
          type: nonNull(sense.querySelector('.anchor')).textContent,
          definition: (nonNull(nonNull(sense.querySelector('.anchor')).nextSibling).textContent ?? '').trim(),
        })),
        family: JSON.parse(nonNull(div.querySelector('.section.family vcom\\:wordfamily')).getAttribute('data') ?? ''),
      })),
    }

    return data
  }
}

export default new VocabularyProvider()
