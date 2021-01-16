import { reactive } from 'vue'
import * as E from 'fp-ts/lib/Either'
import { identity, pipe } from 'fp-ts/lib/function'
import { GM_STORE_KEY } from '~/constants'
import { getValue, setValue } from '~/util/gmapi'
import { historyItem, HistoryItem } from './type'

const MAX_SIZE = 100

const state = reactive({
  list: [] as Array<HistoryItem>,
})

const saveHistory = async () => {
  state.list.length = Math.min(state.list.length, MAX_SIZE)
  await setValue(GM_STORE_KEY.HISTORY, JSON.stringify(state.list))
}

const loadHistory = async () => {
  const raw = await getValue(GM_STORE_KEY.HISTORY, '') as string
  const parsedList = pipe(
    E.tryCatch(
      () => JSON.parse(raw) as unknown,
      identity,
    ),
    (v) => (E.isRight(v) && Array.isArray(v.right)
      ? v.right as Array<unknown>
      : []),
  )
    .map((item) => historyItem.decode(item))
    .map((v) => (E.isRight(v) ? v.right : null))
    .filter(<T>(v: T | null): v is T => !!v)
    .filter((_, i) => i < MAX_SIZE)

  state.list = parsedList
  await saveHistory()
}

const clearHistory = async () => {
  state.list = []
  await saveHistory()
}

const addItem = async (item: Pick<HistoryItem, Exclude<keyof HistoryItem, 'time'>>) => {
  await loadHistory()
  const now = Date.now()
  const dupItem = state.list.find(
    (v) => v.word === item.word && now - v.time < 1000 * 60 * 10,
  )

  if (dupItem) {
    state.list.splice(
      state.list.indexOf(dupItem),
      1,
    )
  }

  const mostRecentItem = state.list[0]
  if (mostRecentItem && mostRecentItem.word === item.word) {
    state.list.shift()
  }

  state.list.unshift({
    ...item,
    time: now,
  })
  await saveHistory()
}


export const historyService = {
  state,
  loadHistory,
  clearHistory,
  addItem,
}
