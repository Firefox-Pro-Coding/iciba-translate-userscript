import {
  defineComponent,
  computed,
} from 'vue'

export default defineComponent({
  props: {
    svg: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: 16,
    },
    color: {
      type: String,
      default: '',
    },
  },
  setup: (props) => {
    const computedSize = computed(() => {
      const size = parseInt(`${props.size}`, 10)
      if (`${size}` === `${props.size}`) {
        return `${size}px`
      }
      return props.size
    })

    const svgContent = computed(() => (props.color
      ? props.svg.replace(/(fill="#[a-fA-F0-9]{6}")/g, `fill="${props.color}"`)
      : props.svg))

    const svgUrl = computed(() => `data:image/svg+xml;base64,${window.btoa(svgContent.value)}`)

    return {
      computedSize,
      svgContent,
      svgUrl,
    }
  },
})
