import { defineComponent } from 'vue'
import Foldable from '~/components/Foldable/Foldable.vue'
import { GoogleDictProvider } from '~/provider/GoogleDict'
import { Thesaurus } from '~/provider/GoogleDict/types'
import { bus, EVENTS } from '~/service/globalBus'

import Labels from '../../labels/labels.vue'

interface Props {
  item: Thesaurus
  index: number
}

export default defineComponent({
  name: 'GThesaurusRow',
  components: {
    Labels,
    Foldable,
  },
  props: {
    item: {
      type: null,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup: (props: Props) => {
    const handleNymClick = (event: MouseEvent, nym: any) => {
      if (nym.numEntries) {
        bus.emit({
          type: EVENTS.TRANSLATE,
          word: nym.nym,
          param: {
            provider: GoogleDictProvider.id,
          },
          mouseEvent: event,
        })
      }
    }

    return {
      props,
      handleNymClick,
    }
  },
})
