import { shadowRoot } from '../createRoot'

import colors from './color'
import {
  shadowKeyUmbraOpacity,
  shadowKeyPenumbraOpacity,
  shadowKeyAmbientOpacity,
  shadowKeyUmbra,
  shadowKeyPenumbra,
  shadowKkeyAmbient,
} from './elevation'

const style: Array<string> = []

Object.entries(colors).forEach(([_colorName, colorObject]) => {
  const colorName = _colorName.replace(/([A-Z])/g, s => `-${s.toLowerCase()}`)
  Object.entries(colorObject).forEach(([_accentName, color]) => {
    const accentName = _accentName === 'base'
      ? _accentName
      : `${_accentName.slice(0, _accentName.length - 1)}-${_accentName.slice(_accentName.length - 1, _accentName.length)}`
    const className = accentName === 'base' ? `.${colorName}` : `.${colorName}.${accentName}`
    const textClassName = accentName === 'base' ? `.${colorName}--text` : `.${colorName}--text.text--${accentName}`
    style.push(`${className}{background-color: ${color} !important;border-color: ${color} !important}`)
    style.push(`${textClassName}{color: ${color} !important;caret-color: ${color} !important}`)
  })
})


shadowKeyUmbra.forEach((_v, i) => {
  style.push(`.elevation-${i}{box-shadow: ${shadowKeyUmbra[i]} ${shadowKeyUmbraOpacity},${shadowKeyPenumbra[i]} ${shadowKeyPenumbraOpacity},${shadowKkeyAmbient[i]} ${shadowKeyAmbientOpacity}!important;}`)
})

const name = [
  ['p', 'padding'],
  ['m', 'margin'],
]

// tslint:disable-next-line:no-unnecessary-type-annotation
const direction: Array<[string, Array<string>]> = [
  ['t', ['top']],
  ['r', ['right']],
  ['b', ['bottom']],
  ['l', ['left']],
  ['x', ['left', 'right']],
  ['y', ['top', 'bottom']],
  ['a', ['top', 'bottom', 'left', 'right']],
]
const value = [
  ['auto', 'auto'],
  [0, '0'],
  [1, '4px'],
  [2, '8px'],
  [3, '16px'],
  [4, '24px'],
  [5, '48px'],
]

name.forEach((nameTuple) => {
  direction.forEach((directionTuple) => {
    value.forEach((valueTuple) => {
      const className = `.${nameTuple[0]}${directionTuple[0]}-${valueTuple[0]}`
      const statements = directionTuple[1].map(directionName => `${nameTuple[1]}-${directionName}: ${valueTuple[1]}!important;`)
      style.push(`${className}{${statements.join('')}}`)
    })
  })
})

const styleElement = document.createElement('style')
styleElement.innerHTML = style.join('\n')
shadowRoot.appendChild(styleElement)
