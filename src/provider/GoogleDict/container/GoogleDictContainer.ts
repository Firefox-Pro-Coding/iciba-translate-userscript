import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { got } from '~/src/lib/gmapi'
import playAudio from '~/src/lib/playAudio'
import getScrollBarWidth from '~/src/lib/scrollbar-width'
import { IAudioCache } from '~/src/interfaces/index'
import labelSet from './components/labelSet/labelSet.vue'
import thesaurus from './components/thesaurus/thesaurus.vue'

@Component({
  name: 'GoogleDictContainer',
  components: {
    labelSet,
    thesaurus,
  },
})
export default class App extends Vue {
  public dictionaryData: any = null
  public scrollbar = {
    track: {
      top: 0,
    },
    thumb: {
      size: '0',
      position: '0',
    },
  }
  public scrollbarWidth = getScrollBarWidth()
  public modalVisible = false
  public drag = {
    start: false,
    startY: 0,
    startScrollTop: 0,
  }
  public container: HTMLElement = null as any as HTMLElement
  public noScrollBar = true
  private audioCache: IAudioCache = {}

  public get scrollbarStyle() {
    return {
      track: {
        top: `${this.scrollbar.track.top}px`,
      },
      thumb: {
        height: `${this.scrollbar.thumb.size}%`,
        top: `${this.scrollbar.thumb.position}%`,
      },
    }
  }

  public mounted() {
    this.container = this.$refs.container as HTMLElement
    this.container.addEventListener('scroll', this.scrollBarListener, false)
    this.container.addEventListener('resize', this.scrollBarListener, false)
    this.container.addEventListener('mouseenter', this.scrollBarListener, false)
    window.addEventListener('mousemove', this.handleScrollbarThumbMousemove, false)
    window.addEventListener('mouseup', this.handleScrollbarThumbMouseup, false)
  }

  public beforeDestroy() {
    this.container.addEventListener('scroll', this.scrollBarListener, false)
    this.container.addEventListener('resize', this.scrollBarListener, false)
    this.container.addEventListener('mouseenter', this.scrollBarListener, false)
  }

  public handleOpenModal() {
    this.modalVisible = true
  }

  public handleCloseModal() {
    this.modalVisible = false
  }

  public handleScrollbarThumbClick(e: MouseEvent) {
    e.preventDefault()
    this.drag.start = true
    this.drag.startY = e.clientY
    this.drag.startScrollTop = this.container.scrollTop
  }

  public handleScrollbarThumbMousemove(e: MouseEvent) {
    if (this.drag.start) {
      e.preventDefault()

      const {
        scrollHeight,
        clientHeight,
      } = this.container

      const avaliableScrollSpace = scrollHeight - clientHeight
      const moveDelta = e.clientY - this.drag.startY
      const moveDeltaPercentage = moveDelta / avaliableScrollSpace
      const scrollDelta = scrollHeight * moveDeltaPercentage
      let destScrollTop = this.drag.startScrollTop + scrollDelta
      if (destScrollTop > avaliableScrollSpace) {
        destScrollTop = avaliableScrollSpace
      }
      if (destScrollTop < 0) {
        destScrollTop = 0
      }

      this.container.scrollTop = destScrollTop
    }
  }

  public handleScrollbarThumbMouseup() {
    this.drag.start = false
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
      this.container.scrollTop = 0
      this.scrollBarListener()
    })
  }

  public handleNymClick() {
    //
  }

  private scrollBarListener() {
    const {
      scrollTop,
      scrollHeight,
      clientHeight,
    } = this.container

    const sizePercentage = clientHeight / scrollHeight
    const avaliableScrollSpace = scrollHeight - clientHeight
    const currentScrollPercentage = scrollTop / avaliableScrollSpace

    // console.log(currentScrollPercentage)

    const thumbMaxHeightPercentage = 1 - sizePercentage
    const thumbTop = thumbMaxHeightPercentage * currentScrollPercentage * 100

    this.noScrollBar = sizePercentage === 1

    this.scrollbar.track = {
      top: scrollTop,
    }
    this.scrollbar.thumb = {
      size: (sizePercentage * 100).toFixed(4),
      position: thumbTop.toFixed(4),
    }
  }
}
