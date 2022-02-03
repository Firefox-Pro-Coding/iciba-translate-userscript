import { defineComponent } from 'vue'

import Foldable from '~/components/Foldable/Foldable.vue'
import IconRadioGroup from '../IconRadioGroup/IconRadioGroup.vue'

export default defineComponent({
  name: 'ProviderCommon',
  components: {
    Foldable,
    IconRadioGroup,
  },
  props: {
    display: Boolean,
    enableHotkey: Boolean,
    nahotkeyme: {
      type: null,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    icons: {
      type: null,
      required: true,
    },
  },
  setup: (props, ctx) => {
    const handleUpdateIcon = (icon: string) => {
      ctx.emit('update:icon', icon)
    }
    const handleUpdateDisplay = (display: boolean) => {
      ctx.emit('update:display', display)
    }
    const handleUpdateEnableHotkey = (enableHotkey: boolean) => {
      ctx.emit('update:enableHotkey', enableHotkey)
    }
    const handleUpdateHotkey = (hotkey: Array<string>) => {
      ctx.emit('update:hotkey', hotkey)
    }

    return {
      props,

      handleUpdateIcon,
      handleUpdateDisplay,
      handleUpdateEnableHotkey,
      handleUpdateHotkey,
    }
  },
})
