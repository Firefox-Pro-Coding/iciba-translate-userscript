import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import globalBus from '~/bus/bus'
import zgen from '~/util/zIndexGenerator'
import store from '~/store'

import imageLoader from './components/imageLoader/imageLoader.vue'
import entry from './components/entry/entry.vue'
import { PROVIDER, GOOGLE_DICT_FOLD_STATUS } from '~/constants/constant'

import minus from '~/assets/img/minus.svg'
import plus from '~/assets/img/plus.svg'

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

  public handleOpenModal(p: { googleDictData: any }) {
    this.zIndex = zgen()
    this.dictionaryData = p.googleDictData

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

    this.$nextTick(() => {
      store.state.googleDict.modalVisible = true
    })
  }

  public handleCloseModal() {
    store.state.googleDict.modalVisible = false
  }

  public handleShrink() {
    if (!this.store.googleDict.thesaurusFolded) {
      this.store.googleDict.thesaurusFolded = true
    } else {
      this.store.googleDict.subsenseFolded = true
    }
  }

  public handleExpand() {
    if (this.store.googleDict.subsenseFolded) {
      this.store.googleDict.subsenseFolded = false
    } else {
      this.store.googleDict.thesaurusFolded = false
    }
  }

  public handleScroll(e: WheelEvent) {
    const scrollBox = this.$refs.scrollBox
    if (scrollBox) {
      // scroll down
      if (e.deltaY > 0 && scrollBox.scrollTop >= scrollBox.scrollHeight - scrollBox.clientHeight) {
        e.preventDefault()
      }

      // scroll up
      if (e.deltaY < 0 && scrollBox.scrollTop === 0) {
        e.preventDefault()
      }
    }
  }

  public get shrinkable() {
    return !this.store.googleDict.thesaurusFolded || !this.store.googleDict.subsenseFolded
  }

  public get expandable() {
    return this.store.googleDict.thesaurusFolded || this.store.googleDict.subsenseFolded
  }

  public get modalVisible() {
    return store.state.googleDict.modalVisible
  }
}
