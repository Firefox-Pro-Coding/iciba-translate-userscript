module.exports = function icibahtmlLoader(source) {
  const callback = this.async()

  callback(null, source.replace(/^<template>/g, '<template lang="icibahtml">'))
}
