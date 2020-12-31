import { defineComponent, reactive, onMounted, onUnmounted, ref, computed } from 'vue'
import { isLeft } from 'fp-ts/lib/Either'

import Scrollable from '~/components/Scrollable/Scrollable.vue'

import { got } from '~/util/gmapi'

import loading from '~/assets/img/loading.svg'
import like_179655 from '~/assets/img/like_179655.svg'

import containerData from '../containerData'
import keywordCache from '../keywordCache'
import bus, { ShowTooltipPayload, HideTooltipPayload, NAMES } from './bus'
import UKeyword from './component/UKeyword/UKeyword.vue'

const icon = {
  loading,
  like_179655,
}

export default defineComponent({
  name: 'UrbanDictionaryContainer',
  components: {
    Scrollable,
    UKeyword,
  },
  setup: () => {
    const refs = {
      container: ref<HTMLDivElement>(),
    }

    const state = reactive({
      tooltips: [] as Array<any>,
    })

    const extractDefinition = (s: string) => {
      const array: Array<{ text: string, isTag: boolean }> = []
      const groups = s.matchAll(/\[.+?\]/g)
      let start = 0
      for (const item of groups) {
        if (item.index !== start) {
          array.push({
            text: s.substring(start, item.index),
            isTag: false,
          })
        }

        array.push({
          text: item[0].slice(1, -1),
          isTag: true,
        })

        start = item.index! + item[0].length
      }

      if (start !== s.length - 1) {
        array.push({
          text: s.substring(start),
          isTag: false,
        })
      }

      return array
    }

    const getTime = (time: string) => time.slice(0, time.indexOf('T'))

    const showTooltip = (p: ShowTooltipPayload) => {
      if (!refs.container.value) {
        return
      }
      const rect = refs.container.value.getBoundingClientRect()
      if (state.tooltips.find((v) => v.id === p.id)) {
        return
      }

      let cacheItem = keywordCache[p.text]

      if (!cacheItem) {
        // load tooltip
        const tooltipPromise = got({
          method: 'GET',
          url: `https://api.urbandictionary.com/v0/tooltip?term=${encodeURIComponent(p.text)}`,
          timeout: 5000,
          responseType: 'json',
        }).then((res) => {
          if (isLeft(res)) {
            throw new Error(res.left.type)
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return JSON.parse(res.right.responseText).string
        })
        cacheItem = { data: tooltipPromise }
        keywordCache[p.text] = cacheItem
      }

      const tooltipItem = {
        id: p.id,
        text: '',
        top: p.top - rect.top,
        left: p.left - rect.left,
      }

      if (cacheItem.data instanceof Promise) {
        cacheItem.data.then((tooltipResult) => {
          cacheItem.data = tooltipResult
          tooltipItem.text = tooltipResult
        }).catch(() => {
          // delete cache if onerror
          delete keywordCache[p.text]
        })
      } else {
        tooltipItem.text = cacheItem.data
      }

      state.tooltips.push(tooltipItem)
    }

    const hideTooltip = (p: HideTooltipPayload) => {
      const item = state.tooltips.find((v) => v.id === p.id)
      if (item) {
        state.tooltips.splice(state.tooltips.indexOf(item), 1)
      }
    }

    const list = computed(() => containerData.data?.list ?? [])

    onMounted(() => {
      bus.on(NAMES.SHOW_TOOLTIP, showTooltip)
      bus.on(NAMES.HIDE_TOOLTIP, hideTooltip)
    })

    onUnmounted(() => {
      bus.off(NAMES.SHOW_TOOLTIP, showTooltip)
      bus.off(NAMES.HIDE_TOOLTIP, hideTooltip)
    })

    return {
      state,
      list,
      refs,
      icon,

      extractDefinition,
      getTime,
      showTooltip,
      hideTooltip,
    }
  },
})
