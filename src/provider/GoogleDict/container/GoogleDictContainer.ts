import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { got } from '~/src/lib/gmapi'
import playAudio from '~/src/lib/playAudio'
import { IAudioCache } from '~/src/interfaces/index'

@Component({
  name: 'GoogleDictContainer',
})
export default class App extends Vue {
  public dictionaryData: any = null
  public scrollbar = {
    size: '0',
    position: '0',
  }
  public modalVisible = false
  private audioCache: IAudioCache = {}

  public get scrollbarStyle() {
    return {
      height: `${this.scrollbar.size}%`,
      top: `${this.scrollbar.position}%`,
    }
  }

  public mounted() {
    const container = this.$refs.container as HTMLElement
    container.addEventListener('scroll', this.scrollBarListener, false)
    container.addEventListener('resize', this.scrollBarListener, false)
    container.addEventListener('mouseenter', this.scrollBarListener, false)
  }

  public beforeDestroy() {
    const container = this.$refs.container as HTMLElement
    container.addEventListener('scroll', this.scrollBarListener, false)
    container.addEventListener('resize', this.scrollBarListener, false)
    container.addEventListener('mouseenter', this.scrollBarListener, false)
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

  private scrollBarListener() {
    const container = this.$refs.container as HTMLElement
    const {
      scrollTop,
      scrollHeight,
      clientHeight,
    } = container

    const size = ((clientHeight / scrollHeight) * 100).toFixed(4)
    const position = ((scrollHeight - clientHeight) / scrollTop).toFixed(4)

    this.scrollbar = {
      size,
      position,
    }
  }
}
