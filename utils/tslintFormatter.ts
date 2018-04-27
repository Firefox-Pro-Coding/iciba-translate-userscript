import * as readline from 'readline'
import chalk from 'chalk'

const rl = readline.createInterface({
  input: process.stdin,
  // output: process.stdout,
})

let hasError = false

rl.on('line', (inputLine) => {
  const reg = /(WARNING|ERROR): (.*?)\[(\d+), (\d+)\]: (.*)/
  if (reg.test(inputLine)) {
    hasError = true
    const match = inputLine.match(reg)
    const [
      ,
      type,
      path,
      line,
      column,
      desc,
    ] = match

    let message = ''
    message += type === 'WARNING' ? chalk.bgMagenta('WARNING') : ''
    message += type === 'ERROR' ? `${chalk.bgRed('ERROR')}  ` : '' // tslint:disable-line
    message += chalk.gray(` ${path}:${line}:${column}`)
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
