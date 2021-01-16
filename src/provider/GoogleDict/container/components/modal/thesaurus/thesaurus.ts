import { defineComponent, reactive, watch, computed } from 'vue'
import Foldable from '~/components/Foldable/Foldable.vue'
import { ThesaurusEntry } from '~/provider/GoogleDict/types'
import { store } from '~/service/store'
import { PROVIDER, GOOGLE_DICT_FOLD_STATUS } from '~/constants'

import Labels from '../labels/labels.vue'
import ThesaurusRow from './thesaurusRow/thesaurusRow.vue'

interface Props {
  thesaurusEntries: Array<ThesaurusEntry>
}

export default defineComponent({
  name: 'GThesaurus',
  components: {
    Labels,
    Foldable,
    ThesaurusRow,
  },
  props: {
    thesaurusEntries: {
      type: null,
      default: () => [],
    },
  },
  setup: (props: Props) => {
    const state = reactive({
      showMoreSet: [] as Array<unknown>,
    })

    const getShowMoreExpanded = (item: unknown) => state.showMoreSet.includes(item)

    const handleToggleMoreOrLess = (item: unknown) => {
      const index = state.showMoreSet.indexOf(item)
      if (index === -1) {
        state.showMoreSet.push(item)
      } else {
        state.showMoreSet.splice(index, 1)
      }
    }

    const addQoute = (text: string): string => `"${text}"`

    watch(() => props.thesaurusEntries, () => {
      state.showMoreSet = []
    }, { immediate: true })

    const combined = computed(() => {
      const synonyms = props.thesaurusEntries
        .map((v) => v.synonyms!)
        .filter(Boolean)
        .flatMap((v) => v)

      const antonyms = props.thesaurusEntries
        .map((v) => v.antonyms!)
        .filter(Boolean)
        .flatMap((v) => v)

      return {
        synonyms,
        antonyms,
      }
    })

    const folded = computed(() => store.config[PROVIDER.GOOGLE_DICT].foldStatus >= GOOGLE_DICT_FOLD_STATUS.FOLD_THESAURUS)

    return {
      t: props.thesaurusEntries,
      state,
      combined,
      folded,

      addQoute,

      handleToggleMoreOrLess,
      getShowMoreExpanded,
    }
  },
})
