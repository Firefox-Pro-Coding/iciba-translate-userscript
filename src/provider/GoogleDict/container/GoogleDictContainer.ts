import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import googleDictBus from '~/provider/GoogleDict/bus'

import globalBus from '~/bus/bus'
import ScrollBar from '~/components/ScrollBar/ScrollBar.vue'

import containerDataStore from '../containerDataStore'
import simpleEntry from './components/simpleEntry/simpleEntry.vue'

import expand_128456 from '~/assets/img/expand_128456.svg'

@Component({
  name: 'GoogleDictContainer',
  components: {
    simpleEntry,
    ScrollBar,
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

  public mounted() {
    googleDictBus.on(googleDictBus.events.NYM_CLICK, this.openIcibaMainWithGoogleDict)
    googleDictBus.on(googleDictBus.events.ENTRY_CLICK, this.openIcibaMainWithGoogleDict)
  }

  public destroyed() {
    googleDictBus.removeListener(googleDictBus.events.NYM_CLICK, this.openIcibaMainWithGoogleDict)
    googleDictBus.removeListener(googleDictBus.events.ENTRY_CLICK, this.openIcibaMainWithGoogleDict)
  }

  public handleOpenModal() {
    globalBus.emit(globalBus.events.GOOGLE_DICT_MODAL_PREPARE_OPEN, { googleDictData: this.containerDataStore.data })
  }

  private openIcibaMainWithGoogleDict({ event, word }: { event: MouseEvent, word: string }) {
    globalBus.emit(globalBus.events.GOOGLE_DICT_WORD_CLICK, { event, word })
  }
}
