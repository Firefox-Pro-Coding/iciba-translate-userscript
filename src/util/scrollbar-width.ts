import { shadowRoot } from '~/service/shadowRoot'

export const getScrollBarWidth = () => {
  const outer = document.createElement('div')
  const outerStyle = outer.style
  outerStyle.overflow = 'scroll'
  outerStyle.height = '100%'
  outerStyle.visibility = 'hidden'
  outerStyle.width = '100px'
  outerStyle.position = 'absolute'
  outerStyle.top = '-9999px'
  shadowRoot.append(outer)

  const widthNoScroll = outer.offsetWidth
  outerStyle.overflow = 'scroll'

  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)

  const widthWithScroll = inner.offsetWidth
  shadowRoot.removeChild(outer)
  return widthNoScroll - widthWithScroll
}
