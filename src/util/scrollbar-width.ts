import { shadowRoot } from '~/service/shadowRoot'

export const getScrollBarWidth = () => {
  const outer = document.createElement('div')
  outer.style.overflow = 'scroll'
  outer.style.height = '100%'
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  outer.style.position = 'absolute'
  outer.style.top = '-9999px'
  shadowRoot.append(outer)

  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = 'scroll'

  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)

  const widthWithScroll = inner.offsetWidth
  shadowRoot.removeChild(outer)
  return widthNoScroll - widthWithScroll
}
