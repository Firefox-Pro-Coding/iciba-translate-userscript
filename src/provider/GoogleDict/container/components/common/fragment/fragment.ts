import { createComponent } from '@vue/composition-api'
// import googleDictBus from '~/provider/GoogleDict/bus'
import { bus, EVENTS } from '~/service/globalBus'
import { PROVIDER } from '~/constants/constant'
import { Fragment } from '~/provider/GoogleDict/types'

interface Props {
  fragment: Array<Fragment>
}

export default createComponent({
  name: 'GFragment',
  props: {
    fragment: null,
  },
  setup: (props: Props) => {
    const handleEntryLinkClick = (event: MouseEvent, word: string) => {
      bus.emit({
        type: EVENTS.TRANSLATE,
        word,
        mouseEvent: event,
        param: {
          provider: PROVIDER.GOOGLE_DICT,
        },
      })
    }
    return {
      props,
      handleEntryLinkClick,
    }
  },
})
