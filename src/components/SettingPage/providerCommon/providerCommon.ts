import { defineComponent } from '@vue/composition-api'

import Foldable from '~/components/Foldable/Foldable.vue'
import IconRadioGroup from '~/components/SettingPage/components/IconRadioGroup/IconRadioGroup.vue'

export default defineComponent({
  name: 'ProviderCommon',
  props: {
    icon: String,
    display: Boolean,
    enableHotkey: Boolean,
    hotkey: null,

    name: String,
    icons: null,
  },
  components: {
    Foldable,
    IconRadioGroup,
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

// TODO: 热键冲突检查
