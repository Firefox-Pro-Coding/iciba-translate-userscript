import { computed, reactive } from 'vue'
import { isLeft, isRight } from 'fp-ts/lib/Either'
import { useIncrement } from '~/util/useIncrement'
import { providers } from '~/provider'

import { EVENTS, TranslateAction } from '../globalBus'
import { store } from '../store'
import { historyService } from '../history'

interface ActiveTask {
  word: string
  provider: string
  id: number
}

const state = reactive({
  loading: false,
  activeTask: null as ActiveTask | null,
  activeProviderId: null as string | null,
  lastUsedProvider: 'ICIBA',
  errorMessage: '',
})

const getTaskId = useIncrement(0)

/** 查词 */
const translate = async (action: TranslateAction) => {
  const param = action.param
  const provider = (param && providers.find((p) => p.id === param.provider))
    ?? providers.find((v) => v.id === store.core.defaultProvider)
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
  const result = await provider.translate({
    word,
    payload,
  })

  if (state.activeTask?.id !== newTask.id) {
    return
  }

  if (isLeft(result)) {
    state.errorMessage = `${provider.id} 错误: ${result.left.message ?? ''}`
    state.loading = false

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
    historyService.addItem({
      word: newTask.word,
      provider: newTask.provider,
    })
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
  if (selection?.toString()) {
    selection.removeAllRanges()
    return
  }

  const active = document.activeElement
  if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) {
    active.setSelectionRange(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
  }
}

export const translateService = {
  state,
  providers,
  activeProvider: computed(() => providers.find((v) => v.id === state.activeProviderId) ?? null),

  translate,
  clearActiveProvider,
  removeSelection,
}
