import Vue from 'vue'
import { defineComponent, reactive } from '@vue/composition-api'

import { shadowRoot } from '~/service/shadowRoot'
import { useIncrement } from '~/util/useIncrement'
import type {
  ToastItem,
  ToastParams,
  ToastFunction,
} from './types'
import Toast from './Toast/index.vue'

const getId = useIncrement()
const state = reactive({
  toasts: [] as Array<ToastItem>,
})

const init = () => {
  const ToastContainer = defineComponent({
    setup: () => () => (
      <div class="toast-container">
        {state.toasts.map((item) => (
          <Toast
            key={item.id}
            text={item.text}
            timeout={item.timeout}
            destroy={item.destroy}
          />
        ))}
      </div>
    ),
  })

  const toastContainer = new Vue({
    el: document.createElement('div'),
    render: (h) => h(ToastContainer),
  })

  shadowRoot.appendChild(toastContainer.$el)
}

export const toast: ToastFunction = (params: ToastParams | string, timeout?: number) => {
  const t = typeof params === 'string'
    ? timeout ?? 3000
    : params.timeout ?? 3000

  const text = typeof params === 'string'
    ? params
    : params.text

  const toastItem = {
    id: getId(),
    timeout: t,
    text,
    destroy: () => {
      const index = state.toasts.indexOf(toastItem)
      state.toasts.splice(index, 1)
    },
  }

  state.toasts.push(toastItem)
}

init()
export const toastService = {
  state,

  toast,
}
