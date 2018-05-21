module.exports = function icibahtmlLoader(source) {
  const callback = this.async()

  const content = source.replace(/<div>/g, '<iciba-div>')
    .replace(/<div(\s|\n)/g, '<iciba-div$1')
    .replace(/<\/div>/g, '</iciba-div>')
  callback(null, content)
}
