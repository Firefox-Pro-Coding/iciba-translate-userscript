export interface ProviderSetting {
  iconHash: string
  autoFallback: boolean
  volume: number
}

export const getDefaultSetting = () => ({
  iconHash: '',
  autoFallback: false,
  volume: 0.3,
})

const assertions = {
  iconHash: (value: any) => typeof value === 'string',
  autoFallback: (value: any) => typeof value === 'boolean',
  volume: (value: any) => typeof value === 'number',
}

const getValidSettingItem = (key: keyof ProviderSetting, value: any) => (
  assertions[key](value)
    ? value
    : getDefaultSetting()[key]
)

export const getValidSetting = (getSetting: any) => {
  const setting = {
    iconHash: getValidSettingItem('iconHash', getSetting.iconHash),
    autoFallback: getValidSettingItem('autoFallback', getSetting.autoFallback),
    volume: getValidSettingItem('volume', getSetting.volume),
  }

  return setting
}

export const isValid = (setting: ProviderSetting) => {
  if (setting) {
    return true
  }
  return false
}
