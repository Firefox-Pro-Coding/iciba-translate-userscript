/* eslint-disable import/first, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */
declare const trustedTypes: any

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const escapeHTMLPolicy = (window as any).trustedTypes
  ? trustedTypes.createPolicy('myEscapePolicy', {
    createHTML: (string: string) => string,
  })
  : null

export const trustedHTMLHack = (...args: Array<any>) => {
  if (escapeHTMLPolicy) {
    return escapeHTMLPolicy.createHTML(...args)
  }
  return args[0]
}

(unsafeWindow as any).icibaUserscriptTrustedHTML = trustedHTMLHack
