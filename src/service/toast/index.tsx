import Vue from 'vue'
import { createComponent, reactive } from '@vue/composition-api'
import Toast from './toast.vue'

import { shadowRoot } from '~/service/shadowRoot'

interface ToastParams {
  text: string
  timeout?: number
}

interface ToastItem {
  id: number
  text: string
  timeout: number
  destroy: () => void
}

const state = reactive({
  toasts: [] as Array<ToastItem>,
})

const ToastContainer = createComponent({
  setup: () => () => (
    <div class="toast-container">
      {state.toasts.map((item) => (
        <Toast
          key={item.id}
          text={item.text}
          timeout={item.timeout}
          destroy={item.destroy} />
      ))}
    </div>
  ),
})

const toastContainer = new Vue({
  el: document.createElement('div'),
  render: (h) => h(ToastContainer),
})

shadowRoot.appendChild(toastContainer.$el)

interface ToastFunction {
  (p: ToastParams): void
  (text: string, timeout?: number): void
}

let id = 0

export const toast: ToastFunction = (params: ToastParams | string, timeout?: number) => {
  const t = typeof params === 'string'
    ? timeout ?? 3000
    : params.timeout ?? 3000

  const text = typeof params === 'string'
    ? params
    : params.text

  id += 1

  const toastItem = {
    id,
    timeout: t,
    text,
    destroy: () => {
      const index = state.toasts.indexOf(toastItem)
      state.toasts.splice(index, 1)
    },
  }

  state.toasts.push(toastItem)
}
