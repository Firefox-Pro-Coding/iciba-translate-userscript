import { GM_STORE_KEY } from '~/constants'
import { historyService } from '~/service/history'
import { getValue, setValue } from '~/util/gmapi'

jest.mock('~/util/gmapi')

beforeEach(() => {
  historyService.state.list = []
  setValue(GM_STORE_KEY.HISTORY, '')
})


test('add item', async () => {
  expect(Array.isArray(historyService.state.list)).toBe(true)

  await historyService.loadHistory()

  expect(historyService.state.list).toHaveLength(0)

  await historyService.addItem({
    word: 'apple',
    provider: 'ICIBA',
  })

  expect(historyService.state.list).toHaveLength(1)
  expect(historyService.state.list[0].word).toBe('apple')
})


test('filter invalid item', async () => {
  expect(Array.isArray(historyService.state.list)).toBe(true)
  setValue(GM_STORE_KEY.HISTORY, JSON.stringify([
    {
      word: 'apple',
      time: Date.now(),
      provider: 'ICIBA',
    },
    {
      word: 'banana',
      time: Date.now(),
      provider: 'ICIBA2',
    },
    3,
  ]))

  await historyService.loadHistory()

  expect(historyService.state.list).toHaveLength(1)
})


test('invalid json', async () => {
  expect(Array.isArray(historyService.state.list)).toBe(true)
  setValue(GM_STORE_KEY.HISTORY, 'invalid json')

  await historyService.loadHistory()

  expect(historyService.state.list).toHaveLength(0)

  const storeJson = getValue(GM_STORE_KEY.HISTORY, '')

  expect(storeJson).toBe(JSON.stringify([]))
})


test('max size 100', async () => {
  expect(Array.isArray(historyService.state.list)).toBe(true)
  setValue(GM_STORE_KEY.HISTORY, JSON.stringify(Array(101).fill({
    word: 'apple',
    time: Date.now(),
    provider: 'ICIBA',
  })))

  await historyService.loadHistory()

  expect(historyService.state.list).toHaveLength(100)
})


test('add duplicate item within 10m', async () => {
  const mockNow = jest.spyOn(global.Date, 'now')
  const now = Date.now()

  mockNow.mockImplementationOnce(() => now - 1000 * 60 * 10 + 1)
  await historyService.addItem({
    word: 'apple',
    provider: 'ICIBA',
  })

  expect(historyService.state.list).toHaveLength(1)

  mockNow.mockImplementationOnce(() => now - 1000 * 60 * 2)
  await historyService.addItem({
    word: 'banana',
    provider: 'ICIBA',
  })

  expect(historyService.state.list).toHaveLength(2)
  expect(historyService.state.list[0].word).toBe('banana')

  mockNow.mockImplementationOnce(() => now)
  await historyService.addItem({
    word: 'apple',
    provider: 'ICIBA',
  })

  expect(historyService.state.list).toHaveLength(2)
  expect(historyService.state.list[0].word).toBe('apple')
  expect(historyService.state.list[0].time).toBe(now)
})


test('add duplicate item within 10m with different provider', async () => {
  const mockNow = jest.spyOn(global.Date, 'now')
  const now = Date.now()

  mockNow.mockImplementationOnce(() => now - 1000 * 60 * 10 + 1)
  await historyService.addItem({
    word: 'apple',
    provider: 'ICIBA',
  })

  expect(historyService.state.list).toHaveLength(1)

  mockNow.mockImplementationOnce(() => now - 1000 * 60 * 2)
  await historyService.addItem({
    word: 'banana',
    provider: 'GOOGLE_DICT',
  })

  expect(historyService.state.list).toHaveLength(2)
  expect(historyService.state.list[0].word).toBe('banana')

  mockNow.mockImplementationOnce(() => now)
  await historyService.addItem({
    word: 'apple',
    provider: 'GOOGLE_TRANSLATE',
  })

  expect(historyService.state.list).toHaveLength(2)
  expect(historyService.state.list[0].word).toBe('apple')
  expect(historyService.state.list[0].time).toBe(now)
})


test('add duplicate item right out of 10m', async () => {
  const mockNow = jest.spyOn(global.Date, 'now')
  const now = Date.now()

  mockNow.mockImplementationOnce(() => now - 1000 * 60 * 10)
  await historyService.addItem({
    word: 'apple',
    provider: 'ICIBA',
  })

  expect(historyService.state.list).toHaveLength(1)

  mockNow.mockImplementationOnce(() => now - 1000 * 60 * 2)
  await historyService.addItem({
    word: 'banana',
    provider: 'ICIBA',
  })

  expect(historyService.state.list).toHaveLength(2)
  expect(historyService.state.list[0].word).toBe('banana')

  mockNow.mockImplementationOnce(() => now)
  await historyService.addItem({
    word: 'apple',
    provider: 'ICIBA',
  })

  expect(historyService.state.list).toHaveLength(3)
  expect(historyService.state.list[0].word).toBe('apple')
  expect(historyService.state.list[0].time).toBe(now)
})


test('add duplicate item sequentially', async () => {
  const mockNow = jest.spyOn(global.Date, 'now')
  const now = Date.now()

  mockNow.mockImplementationOnce(() => now - 1000 * 3600)
  await historyService.addItem({
    word: 'apple',
    provider: 'ICIBA',
  })

  expect(historyService.state.list).toHaveLength(1)

  mockNow.mockImplementationOnce(() => now - 1000 * 1800)
  await historyService.addItem({
    word: 'apple',
    provider: 'ICIBA',
  })

  expect(historyService.state.list).toHaveLength(1)
  expect(historyService.state.list[0].time).toBe(now - 1000 * 1800)

  mockNow.mockImplementationOnce(() => now)
  await historyService.addItem({
    word: 'apple',
    provider: 'GOOGLE_DICT',
  })

  expect(historyService.state.list).toHaveLength(1)
  expect(historyService.state.list[0].word).toBe('apple')
  expect(historyService.state.list[0].provider).toBe('GOOGLE_DICT')
})
