module.exports = ({ env }) => {
  const config = {
    plugins: [
      require('tailwindcss'),
      require('postcss-preset-env'),
    ],
    sourceMap: true,
  }

  if (env === 'production') {
    config.plugins.push(require('@fullhuman/postcss-purgecss')({
      content: [
        './src/**/*.vue',
        './src/**/*.tsx',
        './src/**/*.js',
      ],

      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      whitelistPatterns: [
        /(enter|leave)(-to|-active)?$/
      ],
    }))
    config.plugins.push(require('cssnano'))
  }

  return config
}
