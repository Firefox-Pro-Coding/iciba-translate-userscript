import Vue from 'vue'
import Toast from './toast.vue'

import { getTheAppDiv } from '~/createRoot'

interface ToastParams {
  text: string
  timeout?: number
}

interface ToastFunction {
  (p: ToastParams): void
  (text: string, timeout?: number): void
}

export const toast: ToastFunction = (params: ToastParams | string, timeout?: number) => {
  let propsData: { text: string, timeout: number }
  if (typeof params === 'string') {
    propsData = { text: params, timeout: timeout || 3000 }
  } else {
    propsData = { text: '', timeout: 3000, ...params }
  }
  const instance = new Toast({
    el: document.createElement('div'),
    propsData,
  })

  const theApp = getTheAppDiv()
  if (theApp) {
    theApp.appendChild(instance.$el)
  }
}

Vue.prototype.$toast = toast
