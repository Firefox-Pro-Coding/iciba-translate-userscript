import { createComponent, reactive, computed, watch } from '@vue/composition-api'

interface Props {
  labels: Array<string>
  type: string
  color: string
  size: string
}

export default createComponent({
  name: 'GLabels',
  props: {
    labels: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      default: 'default',
    },
    color: {
      type: String,
      default: 'plain',
    },
    size: {
      type: String,
      default: 'medium',
    },
  },
  setup: (_props) => {
    const props: Props = _props as any
    const state = reactive({
      popoverVisibleMap: {} as Record<string, boolean>,
    })

    /** 显示 popover */
    const handleShowPopover = (label: string) => {
      state.popoverVisibleMap[label] = true
    }

    /** 隐藏 popover */
    const handleHidePopover = (label: string) => {
      state.popoverVisibleMap[label] = false
    }

    const labelClass = computed(() => `${props.type}-label`)
    const colorClass = computed(() => `iciba-label-color-${props.color}`)
    const sizeClass = computed(() => `iciba-label-size-${props.size}`)

    watch(() => props.labels, () => {
      state.popoverVisibleMap = Object.fromEntries(
        props.labels
          .map((v) => [v, state.popoverVisibleMap[v] || false]),
      )
    })

    return {
      state,
      props,
      labelClass,
      colorClass,
      sizeClass,

      handleShowPopover,
      handleHidePopover,
    }
  },
})
