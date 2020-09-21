import { Directive } from 'vue'
import { shadowRoot } from '~/service/shadowRoot'

const map = new Map<Node, any>()

export const clickOutside: Directive = {
  mounted: (el: Element, binding) => {
    const c = (e: Event) => {
      const node = e.target as Node
      if (!node) {
        return
      }

      if (!el.contains(node)) {
        (binding.value as (p: Event) => unknown)(e)
      }
    }
    shadowRoot.addEventListener('click', c)
    map.set(el, c)
  },
  // inserted: function () {},
  // update: function () {},
  // componentUpdated: function () {},
  unmounted: (el) => {
    const c = map.get(el)
    map.delete(el)
    if (c) {
      shadowRoot.removeEventListener('click', c)
    }
  },
}
