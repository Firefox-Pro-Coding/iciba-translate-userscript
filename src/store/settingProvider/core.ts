interface ProviderOrderItem {
  id: string
  name: string
}

export interface CoreSetting {
  pressCtrlToHide: boolean
  stick: boolean
  draggable: boolean
  providerOrder: Array<ProviderOrderItem>
}

export const getDefaultSetting = (): CoreSetting => ({
  pressCtrlToHide: false,
  stick: false,
  draggable: false,
  providerOrder: [
    { id: 'iciba', name: 'iciba' },
  ],
})

const assertions = {
  pressCtrlToHide: (value: any) => typeof value === 'boolean',
  stick: (value: any) => typeof value === 'boolean',
  draggable: (value: any) => typeof value === 'boolean',
  providerOrder: (value: any) => (
    Array.isArray(value)
    && value.length === 4
    && value.find(v => v.id === 'iciba')
    && value.find(v => v.id === 'googleDict')
    && value.find(v => v.id === 'googleTranslate')
    && value.find(v => v.id === 'baiduTranslate')
  ),
}

const getValidSettingItem = (key: keyof CoreSetting, value: any) => (
  assertions[key](value)
    ? value
    : getDefaultSetting()[key]
)

export const getValidSetting = (getSetting: any) => {
  const setting = {
    pressCtrlToHide: getValidSettingItem('pressCtrlToHide', getSetting.pressCtrlToHide),
    stick: getValidSettingItem('stick', getSetting.stick),
    draggable: getValidSettingItem('draggable', getSetting.draggable),
    providerOrder: getValidSettingItem('providerOrder', getSetting.providerOrder),
  }

  return setting
}

export const isValid = (setting: CoreSetting) => {
  if (setting) {
    return true
  }
  return false
}
