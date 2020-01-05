export const genSpacing = () => {
  let style = ''

  const name = [
    ['p', 'padding'],
    ['m', 'margin'],
  ]

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
