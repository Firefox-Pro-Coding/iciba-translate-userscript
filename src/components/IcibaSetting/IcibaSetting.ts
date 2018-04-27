import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'IcibaSetting',
})
export default class App extends Vue {
  public currentTab: string = 'core'
}
