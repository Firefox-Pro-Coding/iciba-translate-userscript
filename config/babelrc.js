module.exports = () => ({
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
    require('../utils/plugin/injectH')
  ],
})
