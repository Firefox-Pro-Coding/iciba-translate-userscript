import Vue from 'vue'
import { IcibaIconType } from './index'

export interface Provider {
  /** unique name of the translate provider */
  uniqName: string

  /** base64 value of the traslator icon (square). svg format preferred */
  icons: Array<IcibaIconType>

  containerInscance: typeof Vue

  /**
   * translate the word. return a rejected promise if any error occured
   * and the error message will show as translate result
   */
  translate(word: string): Promise<void>

  // setting descriptor
  // public abstract settingDescriptor: ITranslateProviderSettingDescriptors
}
