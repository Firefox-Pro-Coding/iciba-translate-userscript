import { isLeft, left, right } from 'fp-ts/lib/Either'
import { got } from '~/util/gmapi'
import copy from '~/util/copy'
import { trustedHTMLHack } from '~/util/trustedHTMLHack'

import containerData from './container/data'


const nonNull = <T>(p: T | undefined | null) => {
  if (!p) {
    throw new Error()
  }
  return p as any as T
}

const getAutocomplete = async (word: string) => {
  const result = await got<string>({
    method: 'GET',
    url: `https://www.vocabulary.com/dictionary/autocomplete?search=${encodeURIComponent(word)}`,
    headers: {
      Accept: '*/*',
      Host: 'www.vocabulary.com',
    },
  })

  if (isLeft(result)) {
    throw new Error(result.left.type)
  }

  const html = result.right.responseText
  const div = document.createElement('div')
  div.innerHTML = trustedHTMLHack(html)
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

  if (isLeft(result)) {
    throw new Error(result.left.type)
  }

  const html = result.right.responseText
  const div = document.createElement('div')
  div.innerHTML = trustedHTMLHack(html)

  const data = {
    short: div.querySelector('.word-area .short')?.textContent?.trim() ?? undefined,
    long: div.querySelector('.word-area .long')?.textContent?.trim() ?? undefined,
    audio: nonNull(div.querySelector('.word-area .audio')).getAttribute('data-audio'),
    // groups: Array.from(div.querySelectorAll('.definitions .section.definition .group')).map((group, index) => ({
    //   index,
    //   group: Array.from(group.querySelectorAll('.ordinal .sense')).map((sense) => ({
    //     type: nonNull(sense.querySelector('.anchor')).textContent,
    //     definition: (nonNull(nonNull(sense.querySelector('.anchor')).nextSibling).textContent ?? '').trim(),
    //   })),
    //   family: JSON.parse(nonNull(div.querySelector('.section.family vcom\\:wordfamily')).getAttribute('data') ?? ''),
    // })),
  }

  return data
}

interface VocabularyParams {
  word: string
}

export const translate = async ({ word }: VocabularyParams) => {
  try {
    const autocomplete = await getAutocomplete(word)
    const newWord = autocomplete.some((v) => v.word === word)
      ? word
      : autocomplete[0].word
    const definition = await getDefinition(newWord)
    return right(() => {
      containerData.data = copy({
        word: newWord,
        autocomplete,
        definition,
      })
    })
  } catch (e: any) {
    return left({
      message: e.message,
    })
  }
}
