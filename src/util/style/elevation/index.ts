import {
  shadowValue,
  shadow,
} from './elevation'

export const genElevation = () => {
  let css = ''

  shadow.forEach((line, lineIndex) => {
    const values = line.map((item, index) => `${item[0]}px ${item[1]}px ${item[2]}px ${item[3]}px ${shadowValue[index]}`).join(',')
    css += `.elevation-${lineIndex}{box-shadow:${values}!important}\n`
  })

  return css
}
