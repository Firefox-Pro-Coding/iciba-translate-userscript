import { defineComponent, reactive, computed, watch } from '@vue/composition-api'

interface Props {
  labels: Array<string>
  type: string
  color: string
  size: string
}

export default defineComponent({
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
      tipMap: {} as Record<string, boolean>,
    })

    /** 显示 popover */
    const shopTip = (label: string) => {
      state.tipMap[label] = true
    }

    /** 隐藏 popover */
    const hideTip = (label: string) => {
      state.tipMap[label] = false
    }

    const labelClass = computed(() => `${props.type}-label`)
    const colorClass = computed(() => `color-${props.color}`)
    const sizeClass = computed(() => `size-${props.size}`)

    watch(() => props.labels, () => {
      state.tipMap = Object.fromEntries(
        props.labels
          .map((v) => [v, state.tipMap[v] || false]),
      )
    }, { immediate: true })

    return {
      state,
      props,
      labelClass,
      colorClass,
      sizeClass,

      shopTip,
      hideTip,
    }
  },
})
