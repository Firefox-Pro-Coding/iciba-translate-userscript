import Vue from 'vue'
import { Component, Model, Prop, Watch } from 'vue-property-decorator'
import { ICircleStyleParam } from '~/src/interfaces/index'

@Component({
  name: 'Circle',
})
export default class App extends Vue {
  public name = 'IcibaCircle'
  @Model() public visible: boolean = false
  @Prop() public position: ICircleStyleParam = {}
  @Prop() public word: string = ''

  // tslint:disable no-unused-variable
  private internalStyle: ICircleStyleParam = {
    top: 'auto',
    bottom: 'auto',
    left: 'auto',
    right: 'auto',
  }
  // tslint:enable no-unused-variable

  public handleClick() {
    this.$emit('circle_click', this.word)
  }

  @Watch('position')
  public onStyleChange() {
    this.internalStyle = {
      ...{
        top: 'auto',
        bottom: 'auto',
        left: 'auto',
        right: 'auto',
      },
      ...this.position,
    }
  }
}
