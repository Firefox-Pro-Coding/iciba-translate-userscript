import { computed, reactive } from '@vue/composition-api'
import { iciba } from '~/provider/Iciba/Iciba'
import { googleDict } from '~/provider/GoogleDict/GoogleDict'
import { googleTranslate } from '~/provider/GoogleTranslate/GoogleTranslate'
import { baiduTranslate } from '~/provider/BaiduTranslate/BaiduTranslate'
import { sougouTranslate } from '~/provider/SougouTranslate/SougouTranslate'
import { urbanDictionary } from '~/provider/UrbanDictionary/UrbanDictionary'
import { bingTranslate } from '~/provider/BingTranslate/BingTranslate'
import { vocabulary } from '~/provider/Vocabulary/Vocabulary'
import { PROVIDER } from '~/constants/constant'
import { ProviderType } from '~/provider/provider'

import { TranslateAction } from '../globalBus'
import { store } from '../store'

interface ActiveTask {
  word: string
  provider: PROVIDER
  id: number
}

const useIncrement = (id: number) => {
  let v = id
  return () => {
    v += 1
    return v
  }
}

const useTranslateService = () => {
  const providers: Array<ProviderType> = [
    iciba,
    googleDict,
    googleTranslate,
    baiduTranslate,
    sougouTranslate,
    urbanDictionary,
    bingTranslate,
    vocabulary,
  ]

  const state = reactive({
    loading: false,
    activeTask: null as ActiveTask | null,
    activeProvider: null as PROVIDER | null,
    lastUsedProvider: PROVIDER.ICIBA,
    errorMessage: '',
  })

  const getTaskId = useIncrement(0)

  /** 查词 */
  const translate = (action: TranslateAction): Promise<unknown> => {
    const param = action.param
    const provider = (param && providers.find((p) => p.id === param.provider))
      ?? providers.find((v) => v.id === store.config.core.defaultProvider)
      ?? providers[0]
    const payload = param?.param ?? null
    const word = action.word

    if (!word) {
      return Promise.reject(new Error('查询不能为空！'))
    }

    state.activeProvider = null

    const newTask: ActiveTask = {
      word,
      provider: provider.id,
      id: getTaskId(),
    }

    // ignore if task was exactly same as active task
    if (state.activeTask
        && state.activeTask.word === newTask.word
        && state.activeTask.provider === newTask.provider) {
      return Promise.resolve()
    }

    state.activeTask = newTask
    state.loading = true
    state.errorMessage = ''
    return provider.translate(word, payload as any).then((callback) => {
      if (state.activeTask?.id === newTask.id) {
        callback()
        state.activeProvider = provider.id
      }
    }, (e: Error) => {
      state.errorMessage = `${provider.id as string}: ${e.message}`
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    }).finally(() => {
      if (state.activeTask?.id !== newTask.id) {
        return
      }
      state.loading = false
      state.activeTask = null
    })
  }

  return {
    state: {
      loading: computed(() => state.loading),
      providers,
      activeProvider: computed(() => providers.find((v) => v.id === state.activeProvider) ?? null),
      lastUsedProvider: computed(() => state.lastUsedProvider),
      errorMessage: computed(() => state.errorMessage),
    },

    translate,
  }
}

export const translateService = useTranslateService()
