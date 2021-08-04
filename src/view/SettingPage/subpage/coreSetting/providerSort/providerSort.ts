import { defineComponent, reactive, onMounted, onUnmounted, ref } from 'vue'

import { store } from '~/service/store'
import { storeType } from '~/service/store/core'
import { getIcon, providers } from '~/provider'

interface DragItem {
  id: string
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
  name: 'ProviderSort',
  setup: () => {
    const refs = {
      container: ref<HTMLDivElement>(),
    }

    const loadList = () => store.core.providerOrder.map((id) => {
      const provider = providers.find((p) => p.id === id)!
      return {
        id,
        icon: getIcon(provider),
        mask: false,
        z: 0,
      }
    }) as Array<DragItem>

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
      if (!refs.container.value) {
        return
      }
      drag.rects = Array.from(refs.container.value.firstElementChild!.children)
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
      store.core.providerOrder = state.list.map((v) => v.id)
    }

    const handleToggleVisibility = (key: string) => {
      const provider = providers.find((p) => p.id === key)!
      provider.store.display = !provider.store.display
    }

    const handleReset = () => {
      store.core.providerOrder = [...storeType.defaultData.providerOrder]
      state.list = loadList()
    }

    const isProviderVisible = (key: string) => {
      const provider = providers.find((p) => p.id === key)!
      return provider.store.display
    }

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
      refs,

      handleDragStart,
      handleToggleVisibility,
      handleReset,

      isProviderVisible,
    }
  },
})
