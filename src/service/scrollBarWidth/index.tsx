import { reactive } from 'vue'
import { getScrollBarWidth } from '~/util/scrollbar-width'

const state = reactive({
  scrollBarWidth: 0,
  devicePixelRatio: null as null | number,
})

const handleCalc = () => {
  const devicePixelRatio = window.devicePixelRatio
  if (devicePixelRatio !== null && state.devicePixelRatio === devicePixelRatio) {
    return
  }
  const w = getScrollBarWidth()
  state.scrollBarWidth = w
}

const init = () => {
  window.addEventListener('resize', handleCalc)
  handleCalc()
}

export const scrollBarWidthService = {
  state,
  init,
}
