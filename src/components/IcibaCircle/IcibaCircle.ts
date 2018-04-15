import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { IPositionStyle, IStyle } from '~/src/interfaces/index'
import sleep from '~/src/lib/sleep'
// import insideOf from '~/src/lib/insideOf'

@Component({
  name: 'IcibaCircle',
})
export default class App extends Vue {
  public visible = false
  public word: string = ''
  public style: IStyle = {}
  public internalStyle: IPositionStyle = {
    top: 'auto',
    bottom: 'auto',
    left: 'auto',
    right: 'auto',
  }
  public icibaMain: Node | null = null

  public mounted() {
    window.addEventListener('mouseup', this.handleWindowClick, false)
  }

  public destroyed() {
    window.removeEventListener('mouseup', this.handleWindowClick, false)
  }

  public setIcibaMain(node: Node) {
    this.icibaMain = node
  }

  public handleClick(e: MouseEvent) {
    this.visible = false
    this.$emit('translate', {
      word: this.word,
      e,
    })
  }

  public async handleWindowClick(e: MouseEvent) {
    const notHandleConditions = [
      // click on it self
      e.target === this.$el,

      // not left click
      e.button !== 0,

      // inside of result box
      // insideOf(e.target, this.icibaMain),
    ]

    if (notHandleConditions.some(v => v)) {
      return
    }

    await sleep(10)
    const selection = window.getSelection().toString().trim()
    // only show button if selection is valid
    if (selection.length) {
      this.visible = true
      this.word = selection
      this.style = {
        top: e.pageY + 7,
        left: e.pageX + 7,
      }
    } else {
      this.visible = false
    }
  }

  @Watch('style')
  public onStyleChange() {
    const init: IPositionStyle = {}
    this.internalStyle = {
      ...{
        top: 'auto',
        bottom: 'auto',
        left: 'auto',
        right: 'auto',
      },
      ...Object.entries(this.style).reduce(
        (p, c) => {
          const [k, v] = c
          return {
            ...p,
            [k]: `${v}px`,
          }
        },
        init,
      ),
    }
  }
}
