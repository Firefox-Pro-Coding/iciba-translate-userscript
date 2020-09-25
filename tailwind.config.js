const tailwindDefaults = require('tailwindcss/defaultConfig')
const colors = require('./utils/color-palette')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    layers: ['utilities'],
    content: [
      './src/**/*.vue',
      './src/**/*.tsx',
      './src/**/*.js',
    ],
  },
  corePlugins: {
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
  },
  variants: {
    backgroundColor: [...tailwindDefaults.variants.backgroundColor, 'group-hover'],
  },
  theme: {
    screens: false,
    fontSize: {
      0: '0',
      ...Array(50).fill(0).map((_v, i) => i + 1).reduce((p, c) => {
        p[c] = `${c}px`
        return p
      }, {}),
    },

    spacing: {
      'auto': 'auto',
      '0': '0',
      ...Object.fromEntries(
        Array(20).fill(0).map(
          (_v, i) => [`${i + 1}px`, `${(i + 1)}px`],
        ),
      ),
      ...Object.fromEntries(
        Array(64).fill(0).map(
          (_v, i) => [i + 1, `${4 * (i + 1)}px`],
        ),
      ),
    },

    borderRadius: {
      'none': '0',
      'full': '9999px',
      ...Array(20).fill(0)
        .map((_v, i) => i + 1)
        .reduce((p, c) => ({ ...p, [c]: `${c}px` }), {}),
    },

    boxShadow: {
      '0': '0px 0px 0px 0px rgba(0,0,0,.2),0px 0px 0px 0px rgba(0,0,0,.14),0px 0px 0px 0px rgba(0,0,0,.12)',
      '1': '0px 2px 1px -1px rgba(0,0,0,.2),0px 1px 1px 0px rgba(0,0,0,.14),0px 1px 3px 0px rgba(0,0,0,.12)',
      '2': '0px 3px 1px -2px rgba(0,0,0,.2),0px 2px 2px 0px rgba(0,0,0,.14),0px 1px 5px 0px rgba(0,0,0,.12)',
      '3': '0px 3px 3px -2px rgba(0,0,0,.2),0px 3px 4px 0px rgba(0,0,0,.14),0px 1px 8px 0px rgba(0,0,0,.12)',
      '4': '0px 2px 4px -1px rgba(0,0,0,.2),0px 4px 5px 0px rgba(0,0,0,.14),0px 1px 10px 0px rgba(0,0,0,.12)',
      '5': '0px 3px 5px -1px rgba(0,0,0,.2),0px 5px 8px 0px rgba(0,0,0,.14),0px 1px 14px 0px rgba(0,0,0,.12)',
      '6': '0px 3px 5px -1px rgba(0,0,0,.2),0px 6px 10px 0px rgba(0,0,0,.14),0px 1px 18px 0px rgba(0,0,0,.12)',
      '7': '0px 4px 5px -2px rgba(0,0,0,.2),0px 7px 10px 1px rgba(0,0,0,.14),0px 2px 16px 1px rgba(0,0,0,.12)',
      '8': '0px 5px 5px -3px rgba(0,0,0,.2),0px 8px 10px 1px rgba(0,0,0,.14),0px 3px 14px 2px rgba(0,0,0,.12)',
      '9': '0px 5px 6px -3px rgba(0,0,0,.2),0px 9px 12px 1px rgba(0,0,0,.14),0px 3px 16px 2px rgba(0,0,0,.12)',
      '10': '0px 6px 6px -3px rgba(0,0,0,.2),0px 10px 14px 1px rgba(0,0,0,.14),0px 4px 18px 3px rgba(0,0,0,.12)',
      '11': '0px 6px 7px -4px rgba(0,0,0,.2),0px 11px 15px 1px rgba(0,0,0,.14),0px 4px 20px 3px rgba(0,0,0,.12)',
      '12': '0px 7px 8px -4px rgba(0,0,0,.2),0px 12px 17px 2px rgba(0,0,0,.14),0px 5px 22px 4px rgba(0,0,0,.12)',
      '13': '0px 7px 8px -4px rgba(0,0,0,.2),0px 13px 19px 2px rgba(0,0,0,.14),0px 5px 24px 4px rgba(0,0,0,.12)',
      '14': '0px 7px 9px -4px rgba(0,0,0,.2),0px 14px 21px 2px rgba(0,0,0,.14),0px 5px 26px 4px rgba(0,0,0,.12)',
      '15': '0px 8px 9px -5px rgba(0,0,0,.2),0px 15px 22px 2px rgba(0,0,0,.14),0px 6px 28px 5px rgba(0,0,0,.12)',
      '16': '0px 8px 10px -5px rgba(0,0,0,.2),0px 16px 24px 2px rgba(0,0,0,.14),0px 6px 30px 5px rgba(0,0,0,.12)',
      '17': '0px 8px 11px -5px rgba(0,0,0,.2),0px 17px 26px 2px rgba(0,0,0,.14),0px 6px 32px 5px rgba(0,0,0,.12)',
      '18': '0px 9px 11px -5px rgba(0,0,0,.2),0px 18px 28px 2px rgba(0,0,0,.14),0px 7px 34px 6px rgba(0,0,0,.12)',
      '19': '0px 9px 12px -6px rgba(0,0,0,.2),0px 19px 29px 2px rgba(0,0,0,.14),0px 7px 36px 6px rgba(0,0,0,.12)',
      '20': '0px 10px 13px -6px rgba(0,0,0,.2),0px 20px 31px 3px rgba(0,0,0,.14),0px 8px 38px 7px rgba(0,0,0,.12)',
      '21': '0px 10px 13px -6px rgba(0,0,0,.2),0px 21px 33px 3px rgba(0,0,0,.14),0px 8px 40px 7px rgba(0,0,0,.12)',
      '22': '0px 10px 14px -6px rgba(0,0,0,.2),0px 22px 35px 3px rgba(0,0,0,.14),0px 8px 42px 7px rgba(0,0,0,.12)',
      '23': '0px 11px 14px -7px rgba(0,0,0,.2),0px 23px 36px 3px rgba(0,0,0,.14),0px 9px 44px 8px rgba(0,0,0,.12)',
      '24': '0px 11px 15px -7px rgba(0,0,0,.2),0px 24px 38px 3px rgba(0,0,0,.14),0px 9px 46px 8px rgba(0,0,0,.12)',
    },

    extend: {
      colors: {
        ...colors,
        'primary': '#409EFF',
        'success': '#67C23A',
        'warning': '#E6A23C',
        'danger': '#F56C6C',
        'info': '#909399',
        'bg-1': 'hsl(0, 0%, 85%)',
        'bg-2': 'hsl(0, 0%, 88%)',
        'bg-3': 'hsl(0, 0%, 91%)',
        'bg-4': 'hsl(0, 0%, 94%)',
        'bg-5': 'hsl(0, 0%, 97%)',
      },
    },
  },
}
