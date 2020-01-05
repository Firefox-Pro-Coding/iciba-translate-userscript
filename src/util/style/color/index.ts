import { colors, shades } from './color'

const accentMap = {
  b: '',
  l: 'lighten',
  d: 'darken',
  a: 'accent',
}

const genCSS = (className: string, textClassName: string, colorValue: string) => {
  let css = ''
  css += `${className}{background-color:${colorValue}!important;border-color:${colorValue}!important}\n`
  css += `${textClassName}{color:${colorValue}!important;caret-color: ${colorValue}!important}\n`
  return css
}

export const genColor = () => {
  let css = ''

  Object.entries(colors).forEach(([colorClassName, colorObject]) => {
    Object.entries(colorObject).forEach(([accent, colorValue]) => {
      let className = `.${colorClassName}`
      let textClassName = `.${colorClassName}--text`

      if (accent !== 'b') {
        const accentClassName = accentMap[accent[0] as keyof typeof accentMap]
        const accentClassValue = accent[1]
        className += `.${accentClassName}-${accentClassValue}`
        textClassName += `.text--${accentClassName}-${accentClassValue}`
      }

      css += genCSS(className, textClassName, `#${colorValue}`)
    })
  })

  Object.entries(shades).forEach(([colorClassName, colorValue]) => {
    const className = `.${colorClassName}`
    const textClassName = `.${colorClassName}--text`
    css += genCSS(className, textClassName, colorValue)
  })

  return css
}
