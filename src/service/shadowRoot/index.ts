export const icibaRoot = document.createElement('div')
icibaRoot.className = 'iciba-root'
icibaRoot.style.all = 'initial'
document.body.append(icibaRoot)

const mo = new MutationObserver(() => {
  const inBody = Array.from(document.body.children).some((v) => v === icibaRoot)
  if (!inBody) {
    document.body.append(icibaRoot)
  }
})

mo.observe(document.body, {
  childList: true,
})

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
