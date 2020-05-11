module.exports = ({ env }) => {
  const config = {
    plugins: [
      require('tailwindcss'),
      require('postcss-preset-env'),
    ],
    sourceMap: true,
  }

  if (env === 'production') {
    config.plugins.push(require('cssnano'))
  }

  return config
}
