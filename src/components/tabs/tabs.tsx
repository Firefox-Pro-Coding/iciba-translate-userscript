import {
  reactive,
  onMounted,
  defineComponent,
  computed,
  watch,
} from 'vue'

export default defineComponent({
  name: 'Tabs',
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    sliderColor: {
      type: String,
      default: '',
    },
  },
  setup: (props, ctx) => {
    const tabs = reactive([] as Array<HTMLDivElement>)

    const state = reactive({
      slider: {
        top: 0,
        height: 0,
      },
      hasArrowButton: false,
    })

    const tabModel = computed({
      get: () => props.modelValue,
      set: (value: number) => ctx.emit('update:modelValue', value),
    })

    const updateSlider = () => {
      const height = tabs[tabModel.value].getBoundingClientRect().height
      const top = tabs
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
      watch(
        () => props.modelValue,
        () => {
          updateSlider()
        },
        { immediate: true },
      )
    })

    return () => (
      <div class="i-tabs flex-col flex-wrap relative items-stretch">
        <div
          class="slider absolute ease-in-out duration-300"
          style={sliderStyle.value}
        />
        {(ctx.slots.default?.() ?? []).map((tab, index) => (
          <div
            ref={(el) => { if (el) { tabs[index] = el as HTMLDivElement } }}
            class={{
              'tab flex flex-center text-14': true,
              'active': tabModel.value === index,
            }}
            v-ripple={{ class: tabModel.value === index ? 'active-ripple' : 'inactive-ripple' }}
            onClick={() => { tabModel.value = index }}
            key={index}
          >
            {tab}
          </div>
        ))}
      </div>
    )
  },
})
