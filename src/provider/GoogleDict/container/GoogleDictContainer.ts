import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import googleDictBus from '~/src/provider/GoogleDict/bus'

import globalBus from '~/src/bus'
import { EVENT_NAMES } from '~/src/constants/constant'

import ScrollBar from '~/src/components/ScrollBar/ScrollBar.vue'
import simpleEntry from './components/simpleEntry/simpleEntry.vue'

@Component({
  name: 'GoogleDictContainer',
  components: {
    simpleEntry,
    ScrollBar,
  },
})
export default class App extends Vue {
  public dictionaryData: any = null
  public modalVisible = false

  public mounted() {
    googleDictBus.on(googleDictBus.NYM_CLICK, this.handleNymClick)
    googleDictBus.on(googleDictBus.ENTRY_CLICK, this.handleEntryLinkClick)
  }

  public handleOpenModal() {
    globalBus.emit(EVENT_NAMES.GOOGLE_DICT_MODAL_PREPARE_OPEN, this.dictionaryData)
  }

  public visibleCallback() {
    this.$nextTick(() => {
      const box = this.$refs.scrollBox as any
      box.scrollToTop()
      box.recalcScrollbar()
    })
  }

  private handleNymClick(word: string) {
    // TODO:
    console.log(word)  // eslint-disable-line
  }

  private handleEntryLinkClick(word: string) {
    // TODO:
    console.log(word)  // eslint-disable-line
  }
}
