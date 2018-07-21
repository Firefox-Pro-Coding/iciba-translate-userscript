import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { got } from '~/src/lib/gmapi'
import playAudio from '~/src/lib/playAudio'
import googleDictBus from '~/src/provider/GoogleDict/bus'
import globalBus from '~/src/bus'
import { EVENT_NAMES } from '~/src/constants/constant'
import zgen from '~/src/lib/zIndexGenerator'

import audioCache from '../audioCache'
import imageLoader from './components/imageLoader/imageLoader.vue'
import entry from './components/entry/entry.vue'

@Component({
  name: 'GoogleDictModal',
  components: {
    imageLoader,
    entry,
  },
})
export default class App extends Vue {
  public dictionaryData: any = null
  public modalVisible = false
  public zIndex: number = 0
  private audioCache = audioCache

  public mounted() {
    googleDictBus.on('play-audio', this.handlePlay)
    googleDictBus.on('nym-click', this.handleNymClick)
    googleDictBus.on('entry-click', this.handleEntryLinkClick)
    globalBus.on(EVENT_NAMES.GOOGLE_DICT_MODAL_OPEN, this.handleOpenModal)
  }

  public handleOpenModal(payload: any) {
    this.zIndex = zgen()
    this.dictionaryData = payload
    this.modalVisible = true
  }

  public handleCloseModal() {
    this.modalVisible = false
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

  private handleNymClick(word: string) {
    // TODO
    console.log(word)
  }

  private handleEntryLinkClick(word: string) {
    // TODO
    console.log(word)
  }
}
