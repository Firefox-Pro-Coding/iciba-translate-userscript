import { defineComponent } from '@vue/composition-api'
import Foldable from '~/components/Foldable/Foldable.vue'
import { Thesaurus } from '~/provider/GoogleDict/types'
import { bus, EVENTS } from '~/service/globalBus'
import { PROVIDER } from '~/constants/constant'

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
    item: null,
    index: Number,
  },
  setup: (props: Props) => {
    const handleNymClick = (event: MouseEvent, nym: any) => {
      if (nym.numEntries) {
        bus.emit({
          type: EVENTS.TRANSLATE,
          word: nym.nym,
          param: {
            provider: PROVIDER.GOOGLE_DICT,
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
