const fs = require('fs')
const path = require('path')

const coreRules = require('./source/coreRules.js')
const codestyle = require('./source/codestyle.js')

fs.writeFileSync(
  path.join(__dirname, 'coreRules.json'),
  JSON.stringify({ rules: coreRules }, null, 2),
)
fs.writeFileSync(
  path.join(__dirname, 'codestyle.json'),
  JSON.stringify({ rules: codestyle }, null, 2),
)
