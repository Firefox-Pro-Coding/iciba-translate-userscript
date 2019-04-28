import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Scrollable from '~/components/Scrollable/Scrollable.vue'
import containerData from '../containerData'

@Component({
  name: 'BaiduTranslateContainer',
  components: {
    Scrollable,
  },
})
export default class BaiduTranslateContainer extends Vue {
  public get translateResult() {
    return containerData.data
  }
}
