import { defineComponent } from 'vue'
import { bus, EVENTS } from '~/service/globalBus'
import Scrollable from '~/components/Scrollable/Scrollable.vue'
import expand_128456 from '~/assets/img/expand_128456.svg'
import { containerData } from './data'
import simpleEntry from './components/container/simpleEntry/simpleEntry.vue'


export default defineComponent({
  name: 'GoogleDictContainer',
  components: {
    simpleEntry,
    Scrollable,
  },
  setup: () => {
    const handleOpenModal = () => {
      bus.emit({
        type: EVENTS.OPEN_GOOGLE_DICT_MODAL,
        googleDictData: containerData.data,
      })
    }

    return {
      containerData,
      icon: {
        expand_128456,
      },
      handleOpenModal,
    }
  },
})
