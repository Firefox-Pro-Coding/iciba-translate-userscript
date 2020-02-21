import { computed, reactive } from '@vue/composition-api'
import IcibaProvider from '~/provider/Iciba/Iciba'
import GoogleDictProvider from '~/provider/GoogleDict/GoogleDict'
import GoogleTranslateProvider from '~/provider/GoogleTranslate/GoogleTranslate'
import BaiduTranslateProvider from '~/provider/BaiduTranslate/BaiduTranslate'
import SougouTranslateProvider from '~/provider/SougouTranslate/SougouTranslate'
import UrbanDictionaryProvider from '~/provider/UrbanDictionary/UrbanDictionary'
import BingTranslateProvider from '~/provider/BingTranslate/BingTranslate'
import VocabularyProvider from '~/provider/Vocabulary/Vocabulary'
import { TranslateAction } from '../globalBus'
import { PROVIDER } from '~/constants/constant'

interface ActiveTask {
  word: string
  provider: PROVIDER
  id: number
}

const useIncrement = (id: number) => {
  const state = reactive({
    count: id,
  })
  const c = computed(() => {
    state.count += 1
    return state.count
  })
  return c
}

const useTranslateService = () => {
  const providers = [
    IcibaProvider,
    GoogleDictProvider,
    GoogleTranslateProvider,
    BaiduTranslateProvider,
    SougouTranslateProvider,
    UrbanDictionaryProvider,
    BingTranslateProvider,
    VocabularyProvider,
  ]

  const state = reactive({
    loading: false,
    activeTask: null as ActiveTask | null,
    activeProvider: null as PROVIDER | null,
    lastUsedProvider: PROVIDER.ICIBA,
    errorMessage: '',
  })

  const taskId = useIncrement(0)

  /** 查词 */
  const translate = (action: TranslateAction): Promise<unknown> => {
    if (!action.param) {
      return Promise.resolve()
    }

    const provider = providers.find((p) => p.uniqName === action.param!.provider) ?? providers[0]
    const payload = action.param.param
    const word = action.word

    if (!word) {
      return Promise.reject(new Error('查询不能为空！'))
    }

    state.activeProvider = null

    const newTask: ActiveTask = {
      word,
      provider: provider.uniqName,
      id: taskId.value,
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
        state.activeProvider = provider.uniqName
      }
    }, (e: Error) => {
      state.errorMessage = `${provider.uniqName}: ${e.message}`
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
      activeProvider: computed(() => providers.find((v) => v.uniqName === state.activeProvider) ?? null),
      lastUsedProvider: computed(() => state.lastUsedProvider),
      errorMessage: computed(() => state.errorMessage),
    },

    translate,
  }
}

export const translateService = useTranslateService()
