import { defineComponent, reactive, onMounted, watch } from 'vue'
import { got } from '~/util/gmapi'


export default defineComponent({
  name: 'GImageLoader',
  props: {
    url: {
      type: String,
      required: true,
    },
    height: {
      type: [Number, String],
      required: true,
    },
    width: {
      type: [Number, String],
      required: true,
    },
  },
  setup: (props) => {
    const state = reactive({
      data: '',
    })

    const handleDraw = async (url: string): Promise<void> => {
      try {
        const response = await got<Blob>({
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'upgrade-insecure-requests': '1',
            'User-Agent': window.navigator.userAgent,
          },
          responseType: 'blob',
          url,
          timeout: 5000,
        })
        const blob = response.response

        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
          state.data = (reader.result as string).replace('data:;base64,', 'data:image/png;base64,')
        }
      } catch (e) {
        return Promise.reject(e)
      }
      return Promise.resolve()
    }

    const loadImage = () => {
      if (props.url) {
        state.data = ''
        handleDraw(props.url)
      }
    }

    onMounted(() => {
      loadImage()
    })

    watch(() => props.url, () => {
      loadImage()
    })

    return {
      props,
      state,
    }
  },
})
