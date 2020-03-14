import { defineComponent, reactive, onMounted, onUnmounted } from '@vue/composition-api'

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
  setup: (_p, ctx) => {
    const $refs: {
      container: HTMLDivElement
    } = ctx.refs

    const state = reactive({
      tooltips: [] as Array<any>,
    })

    const extractDefinition = (s: string) => {
      const array: Array<{ text: string, isTag: boolean }> = []
      let isTag = false
      let start = 0

      for (let i = 0; i < s.length; i += 1) {
        if (s[i] === '[' || s[i] === ']') {
          if (start < i) {
            array.push({
              text: s.slice(start, i),
              isTag,
            })
          }
          start = i + 1
          isTag = !isTag
        }
      }

      return array
    }

    const getTime = (time: string) => time.slice(0, time.indexOf('T'))

    const showTooltip = (p: ShowTooltipPayload) => {
      const rect = $refs.container.getBoundingClientRect()
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
        }).then((response) => JSON.parse(response.responseText).string) // eslint-disable-line @typescript-eslint/no-unsafe-return
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
      icon,
      result: containerData,

      extractDefinition,
      getTime,
      showTooltip,
      hideTooltip,
    }
  },
})
