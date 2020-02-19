import { defineComponent } from '@vue/composition-api'

import { PROVIDER } from '~/constants/constant'
import { store } from '~/service/store'
import { bus, EVENTS } from '~/service/globalBus'

import Labels from '../labels/labels.vue'
import Foldable from '../foldable/foldable.vue'
import { ThesaurusEntry } from '~/provider/GoogleDict/types'

interface Props {
  thesaurusEntries: Array<ThesaurusEntry>
}

export default defineComponent({
  name: 'GThesaurus',
  components: {
    Labels,
    Foldable,
  },
  props: {
    thesaurusEntries: {
      type: Array,
      default: () => [],
    },
  },
  setup: (props: Props) => {
    const addQoute = (text: string): string => `"${text}"`

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
      t: props.thesaurusEntries,
      addQoute,
      handleNymClick,
      store,
    }
  },
})
