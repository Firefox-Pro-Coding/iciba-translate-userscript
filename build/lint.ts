import { spawn } from 'child_process'
import * as os from 'os'
import chalk from 'chalk'

const platform = os.platform()
const getcmd = (cmd: string) => (platform === 'win32' ? `${cmd}.cmd` : cmd)
const option = { stdio: 'inherit' }

// tslint:disable no-console
const lints = [
  () => new Promise<number>((rs) => {
    console.log(chalk.bgYellow.black(' ESLint '))
    spawn(`${getcmd('npm')}`, ['run', 'lint:eslint', '--silent'], option)
      .on('exit', rs)
  }),
  () => new Promise<number>((rs) => {
    console.log(chalk.bgYellow.black(' TSLint '))
    spawn(`${getcmd('npm')}`, ['run', 'lint:tslint', '--silent'], option)
      .on('exit', rs)
  }),
  () => new Promise<number>((rs) => {
    console.log(chalk.bgYellow.black(' StyleLint '))
    spawn(`${getcmd('npm')}`, ['run', 'lint:css', '--silent'], option)
      .on('exit', rs)
  }),
]

const main = async() => {
  const errs = []
  for (const lint of lints) {
    errs.push(await lint())
  }
  const code = errs.every(i => i === 0) ? 0 : 1
  if (code === 0) {
    console.log(chalk.bgHex('#7537A4').white(' GREAT! NO ERROR! '))
  } else {
    console.log(chalk.bgHex('#B34848').white(' ERROR FOUND, CHECK ABOVE! '))
  }
  process.exit(code)
}

main()

// eslintInstance.stdout.pipe(process.stdout)
// eslintInstance.stderr.pipe(process.stderr)
