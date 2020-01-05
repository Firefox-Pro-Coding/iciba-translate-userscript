import {
  createComponent,
  onMounted,
  onUnmounted,
  reactive,
} from '@vue/composition-api'

export default createComponent({
  setup: () => {
    let intervalId = 0
    const state = reactive({
      dots: 3,
    })

    onMounted(() => {
      intervalId = window.setInterval(() => {
        state.dots = state.dots > 10 ? 3 : state.dots + 1
      }, 300)
    })

    onUnmounted(() => {
      window.clearInterval(intervalId)
    })

    return () => (
      <div>加载中{'.'.repeat(state.dots)}</div>
    )
  },
})
