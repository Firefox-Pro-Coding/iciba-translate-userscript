import { defineComponent, reactive, onMounted, onUnmounted } from '@vue/composition-api'

import { defaultData, store } from '~/service/store'
import { PROVIDER } from '~/constants/constant'
import { getIcon } from '~/provider/provider'

interface DragItem {
  id: PROVIDER
  icon: string
  mask: boolean
  z: number
}

interface RectItem {
  left: number
  right: number
  width: number
}

export default defineComponent({
  name: 'CoreSettings',
  setup: (_p, ctx) => {
    const $refs: {
      container: HTMLDivElement
    } = ctx.refs

    const loadList = () => store.config.core.providerOrder.map((id) => ({
      id,
      icon: getIcon(id),
      mask: false,
      z: 0,
    })) as Array<DragItem>

    const state = reactive({
      list: loadList(),
    })

    const drag = {
      item: null as null | DragItem,
      rects: [] as Array<RectItem>,
      cIndex: 0,
    }

    const threshold = 1
    const calcCenter = () => {
      drag.rects = Array.from($refs.container.firstElementChild!.children)
        .map((v) => {
          const b = v.getBoundingClientRect()
          return {
            left: b.left + (1 - threshold) * b.width * 0.5,
            right: b.right - (1 - threshold) * b.width * 0.5,
            width: b.width,
          }
        })
    }

    const handleDragStart = (icon: DragItem) => {
      icon.mask = true
      drag.item = icon
      state.list.forEach((v) => { v.z = 1 })
      icon.z = 3
      calcCenter()
      drag.cIndex = state.list.indexOf(icon)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!drag.item) {
        return
      }

      const cX = e.clientX
      const cIndex = drag.cIndex

      const c = drag.rects

      let newIndex = 0
      for (; newIndex < c.length; newIndex += 1) {
        if (newIndex === cIndex) {
          // eslint-disable-next-line no-continue
          continue
        }

        const item = c[newIndex]

        if (newIndex < cIndex) {
          if (item.right > cX) {
            break
          }
        } else if (item.left > cX) {
          break
        }
      }

      if (newIndex > cIndex) {
        newIndex -= 1
      }

      if (newIndex !== cIndex) {
        const item = state.list.splice(cIndex, 1)
        state.list.splice(newIndex, 0, item[0])
        drag.cIndex = newIndex
      }
    }

    const handleDragEnd = () => {
      if (!drag.item) {
        return
      }
      drag.item.mask = false
      drag.item = null
      store.config.core.providerOrder = state.list.map((v) => v.id)
    }

    const handleToggleVisibility = (key: PROVIDER) => {
      store.config[key].display = !store.config[key].display
    }

    const handleReset = () => {
      store.config.core.providerOrder = [...defaultData.core.providerOrder]
      state.list = loadList()
    }

    const isProviderVisible = (key: PROVIDER) => store.config[key].display

    onMounted(() => {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleDragEnd)
    })

    onUnmounted(() => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleDragEnd)
    })

    return {
      state,

      handleDragStart,
      handleToggleVisibility,
      handleReset,

      isProviderVisible,
    }
  },
})
