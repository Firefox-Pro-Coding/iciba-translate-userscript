import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Scrollable from '~/components/Scrollable/Scrollable.vue'

import { got } from '~/util/gmapi'

import loading from '~/assets/img/loading.svg'
import like_179655 from '~/assets/img/like_179655.svg'

import containerData from '../containerData'
import keywordCache from '../keywordCache'
import bus, { ShowTooltipPayload, HideTooltipPayload } from './bus'
import UKeyword from './component/UKeyword/UKeyword.vue'

@Component({
  name: 'UrbanDictionaryContainer',
  components: {
    Scrollable,
    UKeyword,
  },
})
export default class UrbanDictionaryContainer extends Vue {
  public $refs!: {
    container: HTMLDivElement
  }

  public get result() {
    return containerData.data
  }

  public icon = {
    loading,
    like_179655,
  }

  public tooltips = [] as Array<any>

  public mounted() {
    bus.on(bus.events.SHOW_TOOLTIP, this.showTooltip)
    bus.on(bus.events.HIDE_TOOLTIP, this.hideTooltip)
  }

  public destroyed() {
    bus.removeListener(bus.events.SHOW_TOOLTIP, this.showTooltip)
    bus.removeListener(bus.events.HIDE_TOOLTIP, this.hideTooltip)
  }

  protected extractDefinition(s: string) {
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

  protected getTime(time: string) {
    return time.slice(0, time.indexOf('T'))
  }

  private showTooltip(p: ShowTooltipPayload) {
    const rect = this.$refs.container.getBoundingClientRect()
    if (this.tooltips.find(v => v.id === p.id)) {
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
      }).then(response => JSON.parse(response.responseText).string)
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

    this.tooltips.push(tooltipItem)
  }

  private hideTooltip(p: HideTooltipPayload) {
    const item = this.tooltips.find(v => v.id === p.id)
    if (item) {
      this.tooltips.splice(this.tooltips.indexOf(item), 1)
    }
  }
}
