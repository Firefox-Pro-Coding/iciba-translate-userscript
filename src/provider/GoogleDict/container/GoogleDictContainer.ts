import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { got } from '~/src/lib/gmapi'
import playAudio from '~/src/lib/playAudio'
import getScrollBarWidth from '~/src/lib/scrollbar-width'
import { IAudioCache } from '~/src/interfaces/index'
import bus from '~/src/provider/GoogleDict/bus'

import ScrollBar from '~/src/components/ScrollBar/ScrollBar.vue'

import labelSet from './components/labelSet/labelSet.vue'
import thesaurus from './components/thesaurus/thesaurus.vue'
import phonetics from './components/phonetics/phonetics.vue'
import fragment from './components/fragment/fragment.vue'
import etymology from './components/etymology/etymology.vue'
import imageLoader from './components/imageLoader/imageLoader.vue'
import exampleGroups from './components/exampleGroups/exampleGroups.vue'
import entry from './components/entry/entry.vue'
import simpleEntry from './components/simpleEntry/simpleEntry.vue'

@Component({
  name: 'GoogleDictContainer',
  components: {
    labelSet,
    thesaurus,
    phonetics,
    fragment,
    etymology,
    imageLoader,
    exampleGroups,
    entry,
    simpleEntry,
    ScrollBar,
  },
})
export default class App extends Vue {
  public dictionaryData: any = null
  public modalVisible = false
  private audioCache: IAudioCache = {}

  public mounted() {
    bus.on('play-audio', this.handlePlay)
    bus.on('nym-click', this.handleNymClick)
    bus.on('entry-click', this.handleEntryLinkClick)
  }

  public handleOpenModal() {
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

  public visibleCallback() {
    this.$nextTick(() => {
      const box = this.$refs.scrollBox as any
      box.scrollToTop()
    })
  }

  public handleNymClick(word: string) {
    console.log(word)
  }

  public handleEntryLinkClick(word: string) {
    console.log(word)
  }

  public handleCustomEvent() {
    console.log('custom!')
  }
}
