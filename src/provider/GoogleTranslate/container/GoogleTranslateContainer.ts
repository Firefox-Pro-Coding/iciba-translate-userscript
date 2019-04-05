import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import ScrollBar from '~/components/ScrollBar/ScrollBar.vue'
import containerData from '../containerData'

@Component({
  name: 'GoogleTranslateContainer',
  components: {
    ScrollBar,
  },
})
export default class App extends Vue {
  public get translateResult() {
    return containerData.data
  }
}
