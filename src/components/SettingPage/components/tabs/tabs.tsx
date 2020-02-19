import {
  reactive,
  onMounted,
  defineComponent,
  computed,
  watch,
} from '@vue/composition-api'

export default defineComponent({
  model: {},
  props: {
    value: {
      type: Number,
      required: true,
    },
    sliderColor: {
      type: String,
      default: '',
    },
  },
  setup: (props, setupContext) => {
    const $refs: {
      tab: Array<HTMLDivElement>
    } = setupContext.refs

    const state = reactive({
      slider: {
        top: 0,
        height: 0,
      },
      hasArrowButton: false,
    })

    const tabModel = computed({
      get: () => props.value,
      set: (value: number) => setupContext.emit('input', value),
    })

    const updateSlider = () => {
      const height = $refs.tab[tabModel.value].getBoundingClientRect().height
      const top = $refs.tab
        .filter((_v, i) => i < tabModel.value)
        .map((v) => v.getBoundingClientRect().height)
        .reduce((p, c) => p + c, 0)
      state.slider = {
        top,
        height,
      }
    }

    const sliderStyle = computed(() => ({
      top: `${state.slider.top}px`,
      height: `${state.slider.height}px`,
      ...props.sliderColor ? { color: props.sliderColor } : {},
    }))


    onMounted(() => {
      watch(() => props.value, () => {
        updateSlider()
      })
    })

    return () => {
      const tabs = setupContext.slots.default()
      return (
        <div
          class="tabs__div flex-col flex-wrap relative items-stretch">
          <div
            class="slider absolute ease-in-out duration-300"
            style={sliderStyle}
          />
          {tabs.map((tab, index) => (
            <div
              refInFor={true}
              ref="tab"
              class={{
                'tab__div flex flex-center text-14': true,
                'active': tabModel.value === index,
              }}
              v-ripple={{ class: tabModel.value === index ? 'active-ripple' : 'inactive-ripple' }}
              onClick={() => { tabModel.value = index }}
              key={index}>
              {tab}
            </div>
          ))}
        </div>
      )
    }
  },
})
