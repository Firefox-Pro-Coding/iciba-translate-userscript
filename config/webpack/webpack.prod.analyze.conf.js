const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const StatsPlugin = require('stats-webpack-plugin')

const config = require('./webpack.prod.conf')

config.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin, [{
  analyzerMode: 'static',
}])
config.plugin('SpeedMeasurePlugin').use(SpeedMeasurePlugin)
config.plugin('StatsPlugin').use(StatsPlugin, [
  'stats.json',
  { chunkModules: true },
])

if (process.env.cat === 'false') {
  config.optimization.concatenateModules(false)
}

module.exports = config
