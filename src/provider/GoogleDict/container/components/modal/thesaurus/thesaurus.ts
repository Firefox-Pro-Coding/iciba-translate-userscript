import { defineComponent, reactive, watch, onMounted, computed } from '@vue/composition-api'
import Foldable from '~/components/Foldable/Foldable.vue'

import { store } from '~/service/store'
import { PROVIDER } from '~/constants/constant'
import { bus, EVENTS } from '~/service/globalBus'

import Labels from '../labels/labels.vue'
import { ThesaurusEntry } from '~/provider/GoogleDict/types'

interface Props {
  thesaurusEntries: Array<ThesaurusEntry>
}

interface TItem {
  type: 't'
  name: string
  items: NonNullable<ThesaurusEntry['synonyms']>
}

interface EItem {
  type: 'e'
  name: string
  items: NonNullable<ThesaurusEntry['examples']>
}

type Item = TItem | EItem

interface GroupItem {
  i: number
  groups: Array<Item>
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
    const state = reactive({
      visible: false,
      type: '',
      groups: [] as Array<GroupItem>,
      current: null as null | Item,
    })

    const load = () => {
      state.groups = props.thesaurusEntries.map((v, i) => {
        const item: GroupItem = {
          i,
          groups: [
            v.synonyms && { type: 't', name: 'synonyms', items: v.synonyms },
            v.antonyms && { type: 't', name: 'antonyms', items: v.antonyms },
            v.examples && { type: 'e', name: 'examples', items: v.examples },
          ].filter(Boolean) as GroupItem['groups'],
        }
        return item
      }).filter((v) => v.groups.length)
    }

    const handleToggleVisible = () => {
      if (!state.visible && state.groups.length) {
        state.current = state.groups[0].groups[0]
        window.setTimeout(() => {
          state.visible = true
        })
      } else {
        state.visible = false
      }
    }

    const handleClose = () => {
      state.visible = false
    }

    const handleSelectThesaurus = (t: Item) => {
      state.current = t
    }

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

    const addQoute = (text: string): string => `"${text}"`

    const folded = computed(() => store.state.googleDict.thesaurusFolded)

    onMounted(load)
    watch(() => props.thesaurusEntries, load, { lazy: true })

    return {
      t: props.thesaurusEntries,
      state,

      folded,
      addQoute,
      handleClose,
      handleSelectThesaurus,
      handleToggleVisible,
      handleNymClick,
    }
  },
})
