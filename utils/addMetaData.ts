import * as fs from 'fs'
import * as path from 'path'

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
const packageInfo = require('../package.json')

const metaData = fs.readFileSync(path.join(__dirname, '../config/metaData.js'))
  .toString()
  .replace('{{ version }}', `${packageInfo.version}`)
const indexJs = fs.readFileSync(path.join(__dirname, '../dist/index.js')).toString()

fs.writeFileSync(path.join(__dirname, '../dist/index.js'), `${metaData}\n${indexJs}`)
