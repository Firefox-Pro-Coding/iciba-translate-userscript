import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { AudioCache } from '~/types/index'

import Scrollable from '~/components/Scrollable/Scrollable.vue'

import { got } from '~/util/gmapi'
import playAudio from '~/util/playAudio'

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

  private audioCache: AudioCache = {}

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

  protected async handlePlay(mp3Url: string): Promise<void> {
    const volume = 0.6
    // check cache
    if (mp3Url in this.audioCache) {
      playAudio(this.audioCache[mp3Url], volume)
    } else {
      const urlObj = new URL(mp3Url)
      try {
        const response = await got({
          method: 'GET',
          binary: true,
          headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Host': urlObj.host,
            'Pragma': 'no-cache',
            'Referer': 'http://www.iciba.com/',
            'User-Agent': window.navigator.userAgent,
          },
          responseType: 'arraybuffer',
          url: mp3Url,
          timeout: 5000,
        })

        const arrayBuffer = response.response
        this.audioCache[mp3Url] = arrayBuffer
        playAudio(arrayBuffer, volume)
      } catch (e) {
        return Promise.reject(e)
      }
    }
    return Promise.resolve()
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
