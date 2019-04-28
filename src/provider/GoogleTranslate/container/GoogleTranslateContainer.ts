import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Scrollable from '~/components/Scrollable/Scrollable.vue'
import containerData from '../containerData'

@Component({
  name: 'GoogleTranslateContainer',
  components: {
    Scrollable,
  },
})
export default class GoogleTranslateContainer extends Vue {
  public get translateResult() {
    return containerData.data
  }
}
