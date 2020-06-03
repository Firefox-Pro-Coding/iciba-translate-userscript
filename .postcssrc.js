module.exports = ({ env, options }) => ({
  plugins: [
    options.tailwind && (
      require('tailwindcss')
    ),
    require('postcss-preset-env'),
    env === 'production' && (
      require('cssnano')
    )
  ].filter(Boolean),
  sourceMap: true,
})
