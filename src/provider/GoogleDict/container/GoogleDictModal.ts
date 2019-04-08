import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import globalBus from '~/bus/bus'
import zgen from '~/util/zIndexGenerator'
import store from '~/store'

import imageLoader from './components/imageLoader/imageLoader.vue'
import entry from './components/entry/entry.vue'


@Component({
  name: 'GoogleDictModal',
  components: {
    imageLoader,
    entry,
  },
})
export default class GoogleDictModal extends Vue {
  public dictionaryData: any = null
  public zIndex: number = 0

  public mounted() {
    globalBus.on(globalBus.events.GOOGLE_DICT_MODAL_OPEN, this.handleOpenModal)
  }

  public handleOpenModal(payload: any) {
    this.zIndex = zgen()
    this.dictionaryData = payload
    store.state.googleDictModalVisible = true
  }

  public handleCloseModal() {
    store.state.googleDictModalVisible = false
  }

  public get modalVisible() {
    return store.state.googleDictModalVisible
  }
}
