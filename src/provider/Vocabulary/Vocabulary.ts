import { got } from '~/util/gmapi'
import copy from '~/util/copy'
import { PROVIDER } from '~/constants/constant'

import { ProviderType } from '../provider'
import IcibaContainer from './container/VocabularyContainer.vue'
import containerData from './containerData'
import { audioCacheService } from '~/service/audioCache'
import { audioBus, AEVENTS, PlayAudioAction } from '~/service/audioBus'
// import { ExampleResult } from './types'

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
const useVocabularyProvider = (): ProviderType => {
  const getAutocomplete = async (word: string) => {
    const result = await got<string>({
      method: 'GET',
      url: `https://www.vocabulary.com/dictionary/autocomplete?search=${encodeURIComponent(word)}`,
      headers: {
        Accept: '*/*',
        Host: 'www.vocabulary.com',
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

  // const getExamples = async (word: string) => {
  //   const result = await got<ExampleResult>({
  //     method: 'GET',
  //     url: `https://corpus.vocabulary.com/api/1.0/examples.json?query=${encodeURIComponent(word)}&maxResults=24&startOffset=0&filter=0`,
  //     responseType: 'json',
  //     headers: {
  //       'Accept': '*/*',
  //       'Host': 'www.vocabulary.com',
  //     },
  //   })

  //   const data = result.response
  //   return data
  // }

  const getDefinition = async (word: string) => {
    const result = await got<string>({
      method: 'GET',
      url: `https://www.vocabulary.com/dictionary/definition.ajax?search=${encodeURIComponent(word)}&lang=en`,
      headers: {
        Accept: '*/*',
        Host: 'www.vocabulary.com',
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

  const translate = async (word: string, _payload: unknown) => {
    const autocomplete = await getAutocomplete(word)
    const newWord = autocomplete.some((v) => v.word === word)
      ? word
      : autocomplete[0].word
    const definition = await getDefinition(newWord)
    return () => {
      containerData.data = copy({
        word: newWord,
        autocomplete,
        definition,
      })
    }
  }

  const handlePlay = async (payload: PlayAudioAction): Promise<void> => {
    if (payload.id !== PROVIDER.VOCABULARY) {
      return
    }
    const key = payload.params.key
    if (!key) {
      return
    }
    const url = `https://audio.vocab.com/1.0/us/${key}.mp3`
    const volume = 0.65

    if (audioCacheService.play(url, volume)) {
      return
    }

    const response = await got<ArrayBuffer>({
      method: 'GET',
      headers: {
        Referer: 'https://www.vocabulary.com',
      },
      responseType: 'arraybuffer',
      url,
      timeout: 5000,
    })
    audioCacheService.play(url, response.response, volume)
  }

  audioBus.on(AEVENTS.PLAY_AUDIO, handlePlay)

  return {
    id: PROVIDER.VOCABULARY,
    view: IcibaContainer,
    translate,
  }
}

export const vocabulary = useVocabularyProvider()
