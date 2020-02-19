module.exports = ({ env }) => {
  const config = {
    plugins: [
      require('postcss-preset-env'),
      require('autoprefixer'),
      require('cssnano'),
      require('tailwindcss'),
    ],
    sourceMap: true,
  }

  if (env === 'production') {
    config.plugins.push(require('@fullhuman/postcss-purgecss')({
      content: [
        './src/**/*.vue',
        './src/**/*.tsx',
      ],

      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      whitelistPatterns: [
        /(enter|leave)(-to|-active)?$/
      ],
    }))
  }

  return config
}
