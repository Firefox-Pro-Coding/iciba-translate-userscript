import { createComponent, reactive, onMounted, onUnmounted, watch, computed } from '@vue/composition-api'

export default createComponent({
  name: 'Slider',
  props: {
    value: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  setup: (props, ctx) => {
    const $refs: {
      track: HTMLDivElement
      notch: HTMLDivElement
    } = ctx.refs

    const state = reactive({
      drag: {
        startX: 0,
        dragging: false,
        afterDragging: false,
      },
      cachedValue: 0,
    })

    const getValueFromPercentage = (percentage: number) => {
      let newValue = percentage * (props.max - props.min) + props.min

      const mod = (newValue - props.min) % props.step
      if (mod) {
        if (mod < props.step / 2) {
          newValue -= mod
        } else {
          newValue += props.step - mod
        }
      }

      return newValue
    }

    const getValueFromDeltaPercentage = (percentage: number) => {
      // return this.getValueFromPercentage(props.value / (props.max - props.min) + percentage)
      let newValue = props.value + percentage * (props.max - props.min)
      newValue = newValue < props.min ? props.min : newValue
      newValue = newValue > props.max ? props.max : newValue

      const mod = (newValue - props.min) % props.step
      if (mod) {
        if (mod < props.step / 2) {
          newValue -= mod
        } else {
          newValue += props.step - mod
        }
      }

      return newValue
    }

    const handleNotchMouseDown = (e: MouseEvent) => {
      state.drag.dragging = true
      state.drag.afterDragging = true
      state.drag.startX = e.clientX
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!state.drag.dragging) {
        return
      }
      const deltaX = e.clientX - state.drag.startX
      const width = $refs.track.getBoundingClientRect().width
      const deltaPercentage = deltaX / width
      state.cachedValue = getValueFromDeltaPercentage(deltaPercentage)
    }

    const handleMouseUp = () => {
      state.drag.dragging = false
      setTimeout(() => {
        state.drag.afterDragging = false
      })
      ctx.emit('input', state.cachedValue)
    }

    const handleTrackClick = (e: MouseEvent) => {
      if (e.target === $refs.notch || state.drag.afterDragging) {
        return
      }

      const position = e.clientX - $refs.track.getBoundingClientRect().left
      const width = $refs.track.getBoundingClientRect().width
      const percentage = position / width
      ctx.emit('input', getValueFromPercentage(percentage))
    }


    const position = computed(() => ((state.cachedValue - props.min) / (props.max - props.min)) * 100)

    watch(() => props.value, () => {
      state.cachedValue = props.value
    })

    onMounted(() => {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      state.cachedValue = props.value
    })

    onUnmounted(() => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    })

    return {
      state,
      position,
      handleNotchMouseDown,
      handleTrackClick,
    }
  },
})
