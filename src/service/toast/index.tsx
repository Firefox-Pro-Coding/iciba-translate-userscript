import { createApp, defineComponent, h, reactive } from 'vue'

import { shadowRoot } from '~/service/shadowRoot'
import { useIncrement } from '~/util/useIncrement'
import type {
  ToastItem,
  ToastParams,
  ToastFunction,
} from './types'
import Toast from './Toast/index.vue'
import type { ToastComponent } from './Toast'

const getId = useIncrement()
const state = reactive({
  toasts: [] as Array<ToastItem>,
})

const ToastHack = Toast as ToastComponent

const init = () => {
  const ToastContainer = defineComponent({
    setup: () => () => (
      <div class="toast-container">
        {state.toasts.map((item) => (
          <ToastHack
            key={item.id}
            text={item.text}
            timeout={item.timeout}
            destroy={item.destroy}
          />
        ))}
      </div>
    ),
  })

  const toastContainer = createApp({
    render: () => h(ToastContainer),
  })
  const div = document.createElement('div')
  toastContainer.mount(div)
  shadowRoot.appendChild(div)
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
