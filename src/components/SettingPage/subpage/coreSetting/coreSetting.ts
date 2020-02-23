import Vue from 'vue'
import { defineComponent, reactive, onMounted, watch, onUnmounted, computed } from '@vue/composition-api'

import { settingPageService } from '~/service/settingPage'
import { defaultData, store } from '~/service/store'
import copy from '~/util/copy'
import { providerOptions, PROVIDER } from '~/constants/constant'
import { getIcon } from '~/provider/provider'

interface DragItem {
  id: PROVIDER
  icon: string
  mask: boolean
}

export default defineComponent({
  name: 'CoreSettings',
  setup: (_p, ctx) => {
    const $refs: {
      container: HTMLDivElement
      icons: Array<HTMLDivElement>
    } = ctx.refs
    const state = reactive({
      form: copy(defaultData.core),
      loadingSetting: true,
      list: providerOptions.map((v) => ({
        id: v.key,
        icon: getIcon(v.key),
        mask: false,
      })) as Array<DragItem>,
      drag: null as null | DragItem,
      startOffset: {
        x: 0,
        y: 0,
      },
      start: {
        x: 0,
        y: 0,
      },
      move: {
        x: 0,
        y: 0,
      },
    })

    const state2 = {
      centers: [] as Array<number>,
      currentIndex: 0,
      currentIconBox: null as any as HTMLDivElement,
    }

    const shuffle = () => {
      const arr = [...state.list]
      const newArr = []
      while (arr.length) {
        const index = Math.floor(Math.random() * arr.length)
        newArr.push(arr[index])
        arr.splice(index, 1)
      }
      state.list = newArr
    }

    const getCenter = (d: HTMLDivElement) => {
      const b = d.getBoundingClientRect()
      return (b.left + b.right) / 2
    }

    const exchange = (arr: Array<any>, index: number, index2: number) => {
      const temp = arr[index]
      arr[index] = arr[index2]
      arr[index2] = temp
    }

    const handleDragStart = (e: MouseEvent, icon: DragItem) => {
      state.drag = icon
      const cb = $refs.container.getBoundingClientRect()
      const index = state.list.indexOf(icon)
      const ib = ((e.currentTarget as HTMLDivElement).querySelector('.icon-box') as HTMLDivElement).getBoundingClientRect()
      state.startOffset = {
        x: ib.x - cb.x,
        y: ib.y - cb.y,
      }
      console.log(state.startOffset.x)
      state.start = {
        x: e.clientX,
        y: e.clientY,
      }
      state.move = {
        x: e.clientX,
        y: e.clientY,
      }
      icon.mask = true

      state2.centers = Array.from($refs.container.firstElementChild!.children)
        .map((v) => {
          const b = v.getBoundingClientRect()
          return (b.left + b.right) / 2
        })
      state2.currentIndex = index
      state2.currentIconBox = (e.currentTarget as HTMLDivElement).querySelector('.icon-box') as HTMLDivElement
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!state.drag) {
        return
      }

      const currentCenter = e.clientX
      let newIndex = state2.currentIndex
      for (let i = 0; i < state2.centers.length; i += 1) {
        if (i !== state2.currentIndex) {
          if (state2.centers[i] > currentCenter) {
            newIndex = i
            break
          }
        }
      }

      if (newIndex !== state2.currentIndex) {
        console.log('exchange', newIndex, state2.currentIndex)
        exchange(state.list, newIndex, state2.currentIndex)
        exchange(state2.centers, newIndex, state2.currentIndex)
        state2.currentIndex = newIndex
      }

      // const index = state.list.indexOf(state.drag)
      // const currentCenter = getCenter(iconbox[index])
      // const leftCenter = icons[index - 1]
      //   ? getCenter(icons[index - 1])
      //   : 0
      // const rightCenter = icons[index + 1]
      //   ? getCenter(icons[index + 1])
      //   : Infinity

      // console.log(leftCenter > currentCenter, rightCenter < currentCenter)

      // if (leftCenter > currentCenter) {
      //   exchange(state.list, index, index - 1)
      //   exchange(iconbox, index, index - 1)
      //   exchange(icons, index, index - 1)
      // }

      // if (rightCenter < currentCenter) {
      //   exchange(state.list, index, index + 1)
      //   exchange(iconbox, index, index + 1)
      //   exchange(icons, index, index + 1)
      // }

      state.move = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    const handleDragEnd = () => {
      console.log('mouseup')
      if (!state.drag) {
        return
      }
      state.drag.mask = false
      state.drag = null
      console.log('end')
    }

    const itemStyle = computed(() => ({
      top: `${state.startOffset.y + state.move.y - state.start.y}px`,
      left: `${state.startOffset.x + state.move.x - state.start.x}px`,
    }))

    onMounted(() => {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleDragEnd)
    })

    onUnmounted(() => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleDragEnd)
    })

    const loadSettings = () => {
      state.form = copy(store.config.core)
      Vue.nextTick(() => {
        state.loadingSetting = false
      })
    }

    onMounted(() => {
      loadSettings()
    })

    watch(() => state.form, () => {
      if (state.loadingSetting) {
        return
      }

      if (state.form.defaultProvider === state.form.icibaCircleRightClickProvider) {
        return
      }

      store.config.core = copy(state.form)
      store.saveConfig()
      settingPageService.showSavedToast()
    }, { deep: true, lazy: true })

    return {
      state,
      providerOptions,

      itemStyle,

      shuffle,
      handleDragStart,
      handleDragEnd,
    }
  },
})
