import { isRight } from 'fp-ts/lib/Either'
import { reactive } from 'vue'
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
  try {
    const data = JSON.parse(raw)
    if (!Array.isArray(data)) {
      throw new Error()
    }

    state.list = data.reduce<Array<HistoryItem>>((p, c) => {
      const item = historyItem.decode(c)
      if (isRight(item)) {
        p.push(item.right)
      }
      return p
    }, [])
    state.list.length = Math.min(state.list.length, MAX_SIZE)
  } catch (e) {
    await saveHistory()
  }
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
