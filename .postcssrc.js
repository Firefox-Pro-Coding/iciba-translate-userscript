module.exports = (api) => {
  const tailwindcss = api.file.endsWith('tailwind\.sass')
  const presetEnv = !api.file.includes('node_modules') && !tailwindcss

  return {
    hideNothingWarning: true,
    plugins: [
      tailwindcss && (
        require('tailwindcss')
      ),
      presetEnv && require('postcss-preset-env'),
      api.mode === 'production' && (
        require('cssnano')
      )
    ].filter(Boolean),
    sourceMap: !tailwindcss,
  }
}
