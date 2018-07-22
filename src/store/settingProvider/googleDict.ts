export interface ProviderSetting {
  iconHash: string
}

export const getDefaultSetting = () => ({
  iconHash: '',
})

const assertions = {
  iconHash: (value: any) => typeof value === 'string',
}

const getValidSettingItem = (key: keyof ProviderSetting, value: any) => (
  assertions[key](value)
    ? value
    : getDefaultSetting()[key]
)

export const getValidSetting = (getSetting: any) => {
  const setting = {
    iconHash: getValidSettingItem('iconHash', getSetting.iconHash),
  }

  return setting
}


export const isValid = (setting: ProviderSetting) => {
  if (setting) {
    return true
  }
  return false
}
