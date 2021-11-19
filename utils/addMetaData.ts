import * as fs from 'fs'
import * as path from 'path'

/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
const packageInfo = require('../package.json')

const metaData = fs.readFileSync(path.join(__dirname, '../build/config/metaData.js'))
  .toString()
  .replace('{{ version }}', `${packageInfo.version}`)

const scriptContent = fs.readFileSync(path.join(__dirname, '../dist/iciba.user.js'))
  .toString()
  // TEMP FIX: remove sourcemapping from base64-arraybuffer
  .replace(/\n\/\/# sourceMappingURL=.{1,100}\n/, '\n')

// #53 Promise was overridden
const inits = `
var Promise = Reflect.getPrototypeOf(Response.prototype.text().catch(() => {})).constructor;
window.Promise = Promise;
var self = window;
`

const content = [
  metaData,
  '\n',
  inits,
  'if (typeof GM !== \'undefined\' || typeof GM_setValue !== \'undefined\') {\n',
  scriptContent,
  '\n}',
].join('')

fs.writeFileSync(path.join(__dirname, '../dist/iciba.user.js'), content)
