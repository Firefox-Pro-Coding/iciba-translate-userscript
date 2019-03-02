import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import globalBus from '~/src/bus/bus'
import zgen from '~/src/util/zIndexGenerator'

import imageLoader from './components/imageLoader/imageLoader.vue'
import entry from './components/entry/entry.vue'

@Component({
  name: 'GoogleDictModal',
  components: {
    imageLoader,
    entry,
  },
})
export default class App extends Vue {
  public dictionaryData: any = null
  public modalVisible = false
  public zIndex: number = 0

  public mounted() {
    globalBus.on(globalBus.events.GOOGLE_DICT_MODAL_OPEN, this.handleOpenModal)
  }

  public handleOpenModal(payload: any) {
    this.zIndex = zgen()
    this.dictionaryData = payload
    this.modalVisible = true
  }

  public handleCloseModal() {
    this.modalVisible = false
  }
}
