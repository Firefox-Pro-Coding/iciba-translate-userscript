import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { got } from '~/util/gmapi'
import playAudio from '~/util/playAudio'
import { AudioCache } from '~/types/index'
import Scrollable from '~/components/Scrollable/Scrollable.vue'
import containerData from '../containerData'

import play_speaker_filled_audio_tool_59284 from '~/assets/img/play/speaker-filled-audio-tool_59284.svg'

@Component({
  name: 'IcibaContainer',
  components: {
    Scrollable,
  },
})
export default class IcibaContainer extends Vue {
  public get result() {
    return containerData.data
  }

  public icon = {
    play_speaker_filled_audio_tool_59284,
  }

  private audioCache: AudioCache = {}

  protected seperateChineseJieshi(s: string) {
    const match = s.match(/[（(](.{1,3})[）)](.+)/)
    if (match) {
      return [match[1], match[2]]
    }
    return ['', s]
  }

  protected async handlePlay(mp3Url: string): Promise<void> {
    const volume = 0.6
    // check cache
    if (mp3Url in this.audioCache) {
      playAudio(this.audioCache[mp3Url], volume)
    } else {
      try {
        const response = await got({
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6',
            'Cache-Control': 'no-cache',
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
}
