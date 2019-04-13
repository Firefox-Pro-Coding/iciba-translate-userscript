export interface IcibaPositionStyle {
  top?: string
  bottom?: string
  left?: string
  right?: string
}

export interface IcibaStyle {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export interface IcibaAudioCache {
  [propName: string]: ArrayBuffer
}
