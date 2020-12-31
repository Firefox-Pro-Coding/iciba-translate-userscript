const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
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

config.plugin('duplicate-package-checker-webpack-plugin')
  .use(DuplicatePackageCheckerPlugin)

if (process.env.cat === 'false') {
  config.optimization.concatenateModules(false)
}

module.exports = config
