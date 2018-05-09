const crypto = require('crypto')

module.exports = function icibahtmlLoader(source) {
  const callback = this.async()
  const header = 'data:image/svg+xml;base64,'
  const base64Data = Buffer.from(source).toString('base64')
  const data = `${header}${base64Data}`
  const hash = crypto.createHash('sha256').update('alice', 'utf8').digest('hex')
  const result = `module.exports = {
    hash: ${JSON.stringify(hash)},
    data: ${JSON.stringify(data)},
  }`
  callback(null, result)
}
