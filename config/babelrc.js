module.exports = () => ({
  'presets': [
    ['@babel/preset-env', {
      modules: false,
      useBuiltIns: false,
    }],
  ],
  'plugins': [
    ['@babel/transform-runtime', {
      corejs: 2,
      useESModules: true,
    }],
  ],
})
