export const icibaRoot = document.createElement('div')
icibaRoot.className = 'iciba-root'
icibaRoot.style.all = 'initial'
document.body.append(icibaRoot)

const mo = new MutationObserver(() => {
  if (!document.body.contains(icibaRoot)) {
    document.body.append(icibaRoot)
  }
})

mo.observe(document.body, {
  childList: true,
})

const pollingCheck = () => {
  if (!document.body.contains(icibaRoot)) {
    document.body.append(icibaRoot)
  }
  setTimeout(pollingCheck, 500)
}

pollingCheck()

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
