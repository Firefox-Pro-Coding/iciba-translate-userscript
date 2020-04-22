module.exports = ({ env, options }) => {
  const config = {
    plugins: [
      ...options.tailwind ? [require('tailwindcss')] : [],
      require('postcss-preset-env'),
    ],
    sourceMap: true,
  }

  if (env === 'production' && options.tailwind) {
    config.plugins.push(require('@fullhuman/postcss-purgecss')({
      content: [
        './src/**/*.vue',
        './src/**/*.tsx',
        './src/**/*.js',
      ],

      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      whitelistPatterns: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
      ],
    }))
  }

  if (env === 'production') {
    config.plugins.push(require('cssnano'))
  }

  return config
}
