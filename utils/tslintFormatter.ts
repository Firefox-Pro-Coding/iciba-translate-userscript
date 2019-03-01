import * as path from 'path'
import * as readline from 'readline'
import chalk from 'chalk'

const rl = readline.createInterface({
  input: process.stdin,
  // output: process.stdout,
})

let hasError = false
const basePath = path.join(__dirname, '..').replace(/\\/g, '/')

rl.on('line', (inputLine) => {
  const reg = /(WARNING|ERROR): \((.*)\) (.*?)\[(\d+), (\d+)\]: (.*)/
  if (reg.test(inputLine)) {
    hasError = true
    const match = inputLine.match(reg)

    if (!match) {
      return
    }
    const [,
      type,
      ruleName,
      filePath,
      line,
      column,
      desc,
    ] = Array.from(match)

    const simpPath = filePath.replace(basePath, '')

    let message = ''
    message += type === 'WARNING' ? chalk.yellow('WARNING') : ''
    message += type === 'ERROR' ? `${chalk.red('ERROR')}  ` : '' // tslint:disable-line
    message += chalk.gray(` ${simpPath}:${line}:${column}`)
    message += `\n        ${chalk.gray(`(${ruleName})`)}`
    message += `\n        ${desc}\n`
    console.log(message) // tslint:disable-line
  } else {
    console.log(inputLine) // tslint:disable-line
  }
})

rl.on('close', () => {
  if (hasError) {
    process.exit(1)
  }
})
