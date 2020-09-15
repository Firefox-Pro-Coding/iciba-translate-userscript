module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV)

  return {
    'presets': [
      '@vue/babel-preset-jsx',
      ['@babel/preset-env', {
        modules: false,
      }],
    ],
    'plugins': [
      ['@babel/transform-runtime', {
        corejs: 3,
        useESModules: true,
      }],
      // eslint-disable-next-line global-require
      require('../utils/plugin/injectH'),
    ],
  }
}
