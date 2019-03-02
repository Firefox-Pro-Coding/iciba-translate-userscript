import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'LoadingText',
})
export default class LoadingText extends Vue {
  public dots = 3
  public interval = 0

  public mounted() {
    this.interval = window.setInterval(() => {
      this.changeLoadingDots()
    }, 300)
  }
  public destroyed() {
    window.clearInterval(this.interval)
  }

  public changeLoadingDots() {
    this.dots += 1
    if (this.dots > 10) {
      this.dots = 3
    }
  }

  public get loadingDots() {
    return Array(this.dots).fill('.').join('')
  }
}
