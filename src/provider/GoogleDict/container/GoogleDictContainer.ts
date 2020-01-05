import { createComponent } from '@vue/composition-api'
import { bus, EVENTS } from '~/service/globalBus'
import Scrollable from '~/components/Scrollable/Scrollable.vue'

import containerDataStore from '../containerDataStore'
import simpleEntry from './components/container/simpleEntry/simpleEntry.vue'

import expand_128456 from '~/assets/img/expand_128456.svg'

export default createComponent({
  name: 'GoogleDictContainer',
  components: {
    simpleEntry,
    Scrollable,
  },
  setup: () => {
    const getType = () => typeof containerDataStore.translateData

    const handleOpenModal = () => {
      bus.emit({
        type: EVENTS.OPEN_GOOGLE_DICT_MODAL,
        googleDictData: containerDataStore.data,
      })
    }

    return {
      data: containerDataStore,
      icon: {
        expand_128456,
      },
      getType,
      handleOpenModal,
    }
  },
})
