import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ApiProviderCommon',
  props: {
    appId: String,
    appKey: String,
    productUrl: String,
  },
  setup: (props, ctx) => {
    const handleUpdateAppId = (appId: string) => {
      ctx.emit('update:appId', appId)
    }
    const handleUpdateAppKey = (appKey: string) => {
      ctx.emit('update:appKey', appKey)
    }

    return {
      props,

      handleUpdateAppId,
      handleUpdateAppKey,
    }
  },
})
