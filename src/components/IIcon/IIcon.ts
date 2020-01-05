import {
  createComponent,
  computed,
} from '@vue/composition-api'

export default createComponent({
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

    return {
      computedSize,
      svgContent,
    }
  },
})
