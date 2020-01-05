import { createComponent } from '@vue/composition-api'

import { PROVIDER } from '~/constants/constant'
import { store } from '~/service/store'
import { bus, EVENTS } from '~/service/globalBus'

import Labels from '../labels/labels.vue'
import Foldable from '../foldable/foldable.vue'

interface NymItem {
  numEntries: 1 | 0
  nym: string
}

interface ThesaurusItem {
  nyms: Array<NymItem>
}

interface ThesaurusEntry {
  synonyms: Array<ThesaurusItem>
  antonyms: Array<ThesaurusItem>
  examples: Array<string>
  headword: string
}

export default createComponent({
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
  setup: (props) => {
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
      t: props.thesaurusEntries as Array<ThesaurusEntry>,
      addQoute,
      handleNymClick,
      store,
    }
  },
})
