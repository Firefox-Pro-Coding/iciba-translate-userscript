import { shadowRoot } from '~/service/shadowRoot'

import { genColor } from './color'
import { genElevation } from './elevation'
import { genSpacing } from './spacing'

const genStyle = () => {
  let style = ''
  style += genColor()
  style += genElevation()
  style += genSpacing()

  const styleElement = document.createElement('style')
  styleElement.innerHTML = style
  shadowRoot.appendChild(styleElement)
}

genStyle()
