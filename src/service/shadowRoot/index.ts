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
    sr = (icibaRoot as any).createShadowRoot()
  }

  return sr
})()
