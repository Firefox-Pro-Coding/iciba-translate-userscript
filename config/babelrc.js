module.exports = () => ({
  'presets': [
    '@vue/babel-preset-jsx',
    ['@babel/preset-env', {
      targets: {
        chrome: '53',
        firefox: '29',
      },
      modules: false,
    }],
  ],
  'plugins': [
    ['@babel/transform-runtime', {
      corejs: 3,
      useESModules: true,
    }],
  ],
})
