import { defineComponent } from 'vue'

import ProviderCommon from '~/components/providerCommon/providerCommon.vue'

export default defineComponent({
  name: 'ApiProviderCommon',
  components: {
    ProviderCommon,
  },
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
