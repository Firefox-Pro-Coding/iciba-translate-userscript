import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'CoreSettings',
})
export default class App extends Vue {
  public currentTab: string = 'core'
  public input: string = ''
}
