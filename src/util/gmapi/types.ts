export interface IcibaExtendedGMOption extends GM.Request {
  responseType?: string
  anonymous?: boolean
}

type IfEquals<A, B, X, Y> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? X : Y

export interface IcibaExtendedGMXMLHttpRequestResponse<T = unknown> extends GM.Response<unknown> {
  response: IfEquals<T, unknown, unknown, T>
}
