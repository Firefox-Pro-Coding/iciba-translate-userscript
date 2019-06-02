import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import globalBus from '~/bus/bus'
import zgen from '~/util/zIndexGenerator'
import store from '~/store'

import imageLoader from './components/modal/imageLoader/imageLoader.vue'
import entry from './components/modal/entry/entry.vue'
import { PROVIDER, GOOGLE_DICT_FOLD_STATUS } from '~/constants/constant'

import minus from '~/assets/img/minus.svg'
import plus from '~/assets/img/plus.svg'


const foldOrder = [
  GOOGLE_DICT_FOLD_STATUS.FOLD,
  GOOGLE_DICT_FOLD_STATUS.HALF_FOLD,
  GOOGLE_DICT_FOLD_STATUS.UNFOLD,
]

@Component({
  name: 'GoogleDictModal',
  components: {
    imageLoader,
    entry,
  },
})
export default class GoogleDictModal extends Vue {
  public $refs!: {
    scrollBox: HTMLDivElement
  }
  public dictionaryData: any = null
  public zIndex: number = 0
  public icon = {
    minus,
    plus,
  }

  public mounted() {
    globalBus.on(globalBus.events.GOOGLE_DICT_MODAL_OPEN, this.handleOpenModal)
  }

  protected handleOpenModal(p: { googleDictData: any }) {
    this.zIndex = zgen()
    this.dictionaryData = p.googleDictData

    this.loadFoldStatus()

    this.$nextTick(() => {
      store.state.googleDict.modalVisible = true
    })
  }

  protected handleCloseModal() {
    store.state.googleDict.modalVisible = false
  }

  protected handleShrink() {
    const index = foldOrder.indexOf(this.config[PROVIDER.GOOGLE_DICT].foldStatus) - 1
    if (index >= 0) {
      this.config[PROVIDER.GOOGLE_DICT].foldStatus = foldOrder[index]
    }
    this.loadFoldStatus()
    this.$store.saveConfig()
  }

  protected handleExpand() {
    const index = foldOrder.indexOf(this.config[PROVIDER.GOOGLE_DICT].foldStatus) + 1
    if (index < foldOrder.length) {
      this.config[PROVIDER.GOOGLE_DICT].foldStatus = foldOrder[index]
    }
    this.loadFoldStatus()
    this.$store.saveConfig()
  }

  private loadFoldStatus() {
    if (this.config[PROVIDER.GOOGLE_DICT].foldStatus === GOOGLE_DICT_FOLD_STATUS.FOLD) {
      this.store.googleDict.thesaurusFolded = true
      this.store.googleDict.subsenseFolded = true
    }

    if (this.config[PROVIDER.GOOGLE_DICT].foldStatus === GOOGLE_DICT_FOLD_STATUS.HALF_FOLD) {
      this.store.googleDict.thesaurusFolded = true
      this.store.googleDict.subsenseFolded = false
    }

    if (this.config[PROVIDER.GOOGLE_DICT].foldStatus === GOOGLE_DICT_FOLD_STATUS.UNFOLD) {
      this.store.googleDict.thesaurusFolded = false
      this.store.googleDict.subsenseFolded = false
    }
  }

  protected get shrinkable() {
    return !this.store.googleDict.thesaurusFolded || !this.store.googleDict.subsenseFolded
  }

  protected get expandable() {
    return this.store.googleDict.thesaurusFolded || this.store.googleDict.subsenseFolded
  }

  protected get modalVisible() {
    return store.state.googleDict.modalVisible
  }
}
