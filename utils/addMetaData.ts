import * as fs from 'fs'
import * as path from 'path'

/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
const packageInfo = require('../package.json')

const metaData = fs.readFileSync(path.join(__dirname, '../build/config/metaData.js'))
  .toString()
  .replace('{{ version }}', `${packageInfo.version}`)

const scriptContent = fs.readFileSync(path.join(__dirname, '../dist/iciba.user.js')).toString()

const content = [
  metaData,
  '\n',
  'if (typeof GM !== \'undefined\' || typeof GM_setValue !== \'undefined\') {\n',
  scriptContent,
  '\n}',
].join('')

fs.writeFileSync(path.join(__dirname, '../dist/iciba.user.js'), content)
