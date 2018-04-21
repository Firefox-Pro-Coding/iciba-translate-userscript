import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { got } from '~/src/lib/gmapi'

@Component({
  name: 'IcibaContainer',
})
export default class App extends Vue {
  public data: string = ''

  public async handlePlay(mp3Url: string): Promise<void> {
    const urlObj = new URL(mp3Url)
    let blob
    try {
      const result = await got({
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
        responseType: 'blob',
        url: mp3Url,
        timeout: 5000,
      } as any)
      blob = result
    } catch (e) {
      return Promise.reject(e)
    }

    const objectUrl = window.URL.createObjectURL(blob)
    // release the resource after 60 sec
    setTimeout(() => {
      window.URL.revokeObjectURL(objectUrl)
    }, 60000)

    // play sound
    try {
      const audio = document.createElement('audio')
      const source = document.createElement('source')
      audio.autoplay = false
      audio.controls = false
      audio.volume = 0.5 // set to 50% because it was too loud
      source.type = 'audio/mpeg'
      source.src = objectUrl
      audio.appendChild(source)
      audio.play()
    } catch (e) {
      console.log(e)
    }
    return Promise.resolve()
  }
}
