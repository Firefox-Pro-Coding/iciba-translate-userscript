import * as fs from 'fs'
import * as path from 'path'

// tslint:disable-next-line
const packageInfo = require('../package.json')

const metaData = fs.readFileSync(path.join(__dirname, '../config/metaData.js'))
  .toString()
  .replace('{{ version }}', packageInfo.version)
const indexJs = fs.readFileSync(path.join(__dirname, '../dist/index.js')).toString()

fs.writeFileSync(path.join(__dirname, '../dist/index.js'), `${metaData}\n${indexJs}`)
