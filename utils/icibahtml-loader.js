module.exports = function icibahtmlLoader(source) {
  const callback = this.async()

  callback(null, source.replace(/<div(\s|\n)/g, '<iciba-div$1').replace(/<\/div>/g, '</iciba-div>'))
}
