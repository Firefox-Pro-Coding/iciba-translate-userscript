import { BaseProviderSetting, getBaseProviderSetting } from '../base'
//
export interface ProviderSetting extends BaseProviderSetting {
  autoFallback: boolean
  volume: number
}

export const getDefaultSetting = () => ({
  ...getBaseProviderSetting(),
  autoFallback: false,
  volume: 0.3,
})
