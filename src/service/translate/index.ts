import { computed, reactive } from '@vue/composition-api'
import { isLeft, isRight } from 'fp-ts/lib/Either'
import { PROVIDER } from '~/constants/constant'
import { useIncrement } from '~/util/useIncrement'
import { iciba } from '~/provider/Iciba/Iciba'
import { googleDict } from '~/provider/GoogleDict/GoogleDict'
import { googleTranslate } from '~/provider/GoogleTranslate/GoogleTranslate'
import { baiduTranslate } from '~/provider/BaiduTranslate/BaiduTranslate'
import { sougouTranslate } from '~/provider/SougouTranslate/SougouTranslate'
import { urbanDictionary } from '~/provider/UrbanDictionary/UrbanDictionary'
import { bingTranslate } from '~/provider/BingTranslate/BingTranslate'
import { vocabulary } from '~/provider/Vocabulary/Vocabulary'
import { ProviderType } from '~/provider/provider'

import { EVENTS, TranslateAction } from '../globalBus'
import { store } from '../store'

interface ActiveTask {
  word: string
  provider: PROVIDER
  id: number
}

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
  activeProviderId: null as PROVIDER | null,
  lastUsedProvider: PROVIDER.ICIBA,
  errorMessage: '',
})

const getTaskId = useIncrement(0)

/** 查词 */
const translate = async (action: TranslateAction) => {
  const param = action.param
  const provider = (param && providers.find((p) => p.id === param.provider))
    ?? providers.find((v) => v.id === store.config.core.defaultProvider)
    ?? providers[0]
  const payload = param?.param ?? null
  const word = action.word.trim()

  if (!word) {
    state.errorMessage = '查询不能为空！'
    return
  }

  state.activeProviderId = null

  const newTask: ActiveTask = {
    word,
    provider: provider.id,
    id: getTaskId(),
  }

  // ignore if task was exactly same as active task
  if (state.activeTask
      && state.activeTask.word === newTask.word
      && state.activeTask.provider === newTask.provider) {
    return
  }

  state.activeTask = newTask
  state.loading = true
  state.errorMessage = ''
  const result = await provider.translate(word, payload as any)

  if (state.activeTask?.id !== newTask.id) {
    return
  }

  if (isLeft(result)) {
    if (result.left.message) {
      state.errorMessage = `${provider.id as string}: ${result.left.message}`
      state.loading = false
    }

    if (result.left.redirect) {
      await translate({
        type: EVENTS.TRANSLATE,
        word,
        param: {
          provider: result.left.redirect,
          param: result.left.redirectParams,
        },
      })
      return
    }
  }

  if (isRight(result)) {
    state.activeProviderId = provider.id
    result.right()
    state.loading = false
    state.activeTask = null
  }
}

const clearActiveProvider = () => {
  state.activeProviderId = null
  state.errorMessage = ''
}

const removeSelection = () => {
  const selection = window.getSelection()
  if (!selection) {
    return
  }
  selection.removeAllRanges()
}

export const translateService = {
  state,
  providers,
  activeProvider: computed(() => providers.find((v) => v.id === state.activeProviderId) ?? null),

  translate,
  clearActiveProvider,
  removeSelection,
}
