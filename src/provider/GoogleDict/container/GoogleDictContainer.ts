import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { got } from '~/src/lib/gmapi'
import playAudio from '~/src/lib/playAudio'
import { IAudioCache } from '~/src/types/index'
import googleDictBus from '~/src/provider/GoogleDict/bus'

import globalBus from '~/src/bus'
import { EVENT_NAMES } from '~/src/constants/constant'

import ScrollBar from '~/src/components/ScrollBar/ScrollBar.vue'
import simpleEntry from './components/simpleEntry/simpleEntry.vue'

@Component({
  name: 'GoogleDictContainer',
  components: {
    simpleEntry,
    ScrollBar,
  },
})
export default class App extends Vue {
  public dictionaryData: any = null
  public modalVisible = false
  private audioCache: IAudioCache = {}

  public mounted() {
    googleDictBus.on('play-audio', this.handlePlay)
    googleDictBus.on('nym-click', this.handleNymClick)
    googleDictBus.on('entry-click', this.handleEntryLinkClick)
  }

  public handleOpenModal() {
    globalBus.emit(EVENT_NAMES.GOOGLE_DICT_MODAL_PREPARE_OPEN, this.dictionaryData)
  }

  public async handlePlay(url: string): Promise<void> {
    const volume = 0.6
    const mp3Url = `https:${url}`
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
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Host': urlObj.host,
            'Pragma': 'no-cache',
            'upgrade-insecure-requests': 1,
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

  public visibleCallback() {
    this.$nextTick(() => {
      const box = this.$refs.scrollBox as any
      box.scrollToTop()
      box.recalcScrollbar()
    })
  }

  private handleNymClick(word: string) {
    // TODO
    console.log(word)
  }

  private handleEntryLinkClick(word: string) {
    // TODO
    console.log(word)
  }
}
