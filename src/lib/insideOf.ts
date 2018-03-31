export default (thetarget: Node, parent: Node) => {
  let target: (Node | null) = thetarget
  if (!target) {
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
