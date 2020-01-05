import { reactive } from '@vue/composition-api'
import { toast } from '~/service/toast'

const useSettingPageService = () => {
  const state = reactive({
    saveToastTimeout: 0,
  })

  const showSavedToast = () => {
    if (state.saveToastTimeout) {
      window.clearTimeout(state.saveToastTimeout)
    }
    state.saveToastTimeout = window.setTimeout(() => {
      toast('设置已保存！', 2000)
      state.saveToastTimeout = 0
    }, 1000)
  }
  return {
    showSavedToast,
  }
}

export const settingPageService = useSettingPageService()
