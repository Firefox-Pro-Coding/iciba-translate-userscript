export const icibaRoot = document.createElement('div')
icibaRoot.className = 'iciba-root'
document.body.appendChild(icibaRoot)

export const shadowRoot = (() => {
  let sr: ShadowRoot

  if (icibaRoot.attachShadow) {
    sr = icibaRoot.attachShadow({ mode: 'open' })
  } else {
    // shadow dom v0
    // < firefox 59
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    sr = (icibaRoot as any).createShadowRoot()
  }

  return sr
})()
