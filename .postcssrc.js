module.exports = (api) => ({
  plugins: [
    api.file.endsWith('tailwind\.custom') && (
      require('tailwindcss')
    ),
    require('postcss-preset-env'),
    api.mode === 'production' && (
      require('cssnano')
    )
  ].filter(Boolean),
  sourceMap: true,
})
