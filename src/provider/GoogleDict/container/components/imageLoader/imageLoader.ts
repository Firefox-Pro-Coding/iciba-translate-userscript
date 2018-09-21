import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { got } from '~/src/lib/gmapi'

@Component({
  name: 'GoogleDictContainerImageLoader',
})
export default class extends Vue {
  @Prop()
  public url!: string
  @Prop([Number, String])
  public height!: number | string
  @Prop([Number, String])
  public width!: number | string
  public data: string = ''

  public mounted() {
    this.loadImage()
  }

  public loadImage() {
    if (this.url) {
      this.data = ''
      this.handleDraw(this.url)
    }
  }

  public async handleDraw(url: string): Promise<void> {
    const urlObj = new URL(url)
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
        responseType: 'blob',
        url,
        timeout: 5000,
      })
      const blob = response.response

      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        this.data = (reader.result as string).replace('data:;base64,', 'data:image/png;base64,')
      }
    } catch (e) {
      return Promise.reject(e)
    }
    return Promise.resolve()
  }

  @Watch('url')
  public handleUrlChange() {
    this.loadImage()
  }
}
