import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import googleDictBus from '~/src/provider/GoogleDict/bus'

import globalBus from '~/src/bus/bus'
import ScrollBar from '~/src/components/ScrollBar/ScrollBar.vue'

import containerData from '../containerData'
import simpleEntry from './components/simpleEntry/simpleEntry.vue'

@Component({
  name: 'GoogleDictContainer',
  components: {
    simpleEntry,
    ScrollBar,
  },
})
export default class App extends Vue {
  public get dictionaryData() {
    return containerData.data
  }

  public mounted() {
    googleDictBus.on(googleDictBus.NYM_CLICK, this.handleNymClick)
    googleDictBus.on(googleDictBus.ENTRY_CLICK, this.handleEntryLinkClick)
  }

  public destroyed() {
    googleDictBus.removeListener(googleDictBus.NYM_CLICK, this.handleNymClick)
    googleDictBus.removeListener(googleDictBus.ENTRY_CLICK, this.handleEntryLinkClick)
  }

  public handleOpenModal() {
    globalBus.emit(globalBus.events.GOOGLE_DICT_MODAL_PREPARE_OPEN, this.dictionaryData)
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
