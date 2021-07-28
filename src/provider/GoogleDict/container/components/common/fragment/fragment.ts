import { defineComponent } from 'vue'
// import googleDictBus from '~/provider/GoogleDict/bus'
import { bus, EVENTS } from '~/service/globalBus'
import { Fragment } from '~/provider/GoogleDict/types'
import { GoogleDictProvider } from '~/provider/GoogleDict'

interface Props {
  fragment: Array<Fragment>
}

export default defineComponent({
  name: 'GFragment',
  props: {
    fragment: {
      type: null,
      required: true,
    },
  },
  setup: (props: Props) => {
    const handleEntryLinkClick = (event: MouseEvent, word: string) => {
      bus.emit({
        type: EVENTS.TRANSLATE,
        word,
        mouseEvent: event,
        param: {
          provider: GoogleDictProvider.id,
        },
      })
    }
    return {
      props,
      handleEntryLinkClick,
    }
  },
})
