export default (thetarget: EventTarget | Node | null, parent: Node | null) => {
  let target: Node | null = thetarget as Node
  if (!target || !parent) {
    return false
  }
  while (target && target !== parent) {
    target = target.parentNode
  }
  if (target === parent) {
    return true
  }
  return false
}
