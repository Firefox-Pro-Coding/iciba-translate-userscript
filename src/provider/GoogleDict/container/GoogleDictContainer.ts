import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import googleDictBus from '~/provider/GoogleDict/bus'

import globalBus from '~/bus/bus'
import ScrollBar from '~/components/ScrollBar/ScrollBar.vue'

import containerDataStore from '../containerDataStore'
import simpleEntry from './components/simpleEntry/simpleEntry.vue'

@Component({
  name: 'GoogleDictContainer',
  components: {
    simpleEntry,
    ScrollBar,
  },
})
export default class GoogleDictContainer extends Vue {
  public get dictionaryData() {
    return containerDataStore.data
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
