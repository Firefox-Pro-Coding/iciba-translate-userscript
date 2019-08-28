import { shadowRoot } from '~/createRoot'

import colorObject from './color'

import {
  shadowKeyUmbraOpacity,
  shadowKeyPenumbraOpacity,
  shadowKeyAmbientOpacity,
  shadowKeyUmbra,
  shadowKeyPenumbra,
  shadowKkeyAmbient,
} from './elevation'

const genColor = () => {
  const genColorStyle = (_colorName: string, colorValue: string, accent?: string) => {
    const colorName = _colorName.replace(/[A-Z]/g, (s) => `-${s.toLowerCase()}`)
    let className = `.${colorName}`
    let textClassName = `.${colorName}--text`
    if (accent) {
      const accentName = ({ b: '', l: 'lighten', d: 'darken', a: 'accent' } as any)[accent[0]]
      if (accentName) {
        className = `${className}.${accentName}-${accent[1]}`
        textClassName = `${textClassName}.text--${accentName}-${accent[1]}`
      }
    }
    const backgroundStyle = `${className}{background-color:${colorValue}!important;border-color:${colorValue}!important}`
    const textStyle = `${textClassName}{color:${colorValue}!important;caret-color: ${colorValue}!important}`
    return `${backgroundStyle}\n${textStyle}\n`
  }

  let colorStyleText = ''

  Object.entries(colorObject).forEach(([colorName, colorObjectValue]) => {
    if (colorName === 'shades') {
      Object.entries(colorObjectValue).forEach(([shadesColorName, colorValue]) => {
        colorStyleText += genColorStyle(shadesColorName, colorValue)
      })
    } else {
      Object.entries(colorObjectValue).forEach(([accentName, colorValue]) => {
        colorStyleText += genColorStyle(colorName, colorValue, accentName)
      })
    }
  })

  return colorStyleText
}

const genElevation = () => {
  let style = ''
  shadowKeyUmbra.forEach((_v, i) => {
    style += `.elevation-${i}{box-shadow:${shadowKeyUmbra[i]} ${shadowKeyUmbraOpacity},${shadowKeyPenumbra[i]} ${shadowKeyPenumbraOpacity},${shadowKkeyAmbient[i]} ${shadowKeyAmbientOpacity}!important}\n`
  })
  return style
}

const genSpacing = () => {
  let style = ''

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
        const statements = directionTuple[1].map((directionName) => `${nameTuple[1]}-${directionName}: ${valueTuple[1]}!important;`)
        style += `${className}{${statements.join('')}}\n`
      })
    })
  })
  return style
}

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
