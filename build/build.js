/* eslint-disable import/no-dynamic-require */
const path = require('path')
const webpack = require('webpack')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')

const configPath = path.join(process.cwd(), process.argv[2])
const config = require(configPath)

const compiler = webpack(config.toConfig())

compiler.apply(new ProgressPlugin())
