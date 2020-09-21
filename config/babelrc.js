module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV)

  return {
    'presets': [
      ['@babel/preset-env', {
        modules: false,
      }],
    ],
    'plugins': [
      '@vue/babel-plugin-jsx',
      ['@babel/transform-runtime', {
        corejs: 3,
        useESModules: true,
      }],
    ],
  }
}
