import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import globalBus from '~/bus/bus'
import Scrollable from '~/components/Scrollable/Scrollable.vue'

import containerDataStore from '../containerDataStore'
import simpleEntry from './components/container/simpleEntry/simpleEntry.vue'

import expand_128456 from '~/assets/img/expand_128456.svg'

@Component({
  name: 'GoogleDictContainer',
  components: {
    simpleEntry,
    Scrollable,
  },
})
export default class GoogleDictContainer extends Vue {
  public containerDataStore = containerDataStore
  public icon = {
    expand_128456,
  }

  public getType() {
    return typeof containerDataStore.translateData
  }

  public handleOpenModal() {
    globalBus.emit(globalBus.events.GOOGLE_DICT_MODAL_PREPARE_OPEN, { googleDictData: this.containerDataStore.data })
  }
}
