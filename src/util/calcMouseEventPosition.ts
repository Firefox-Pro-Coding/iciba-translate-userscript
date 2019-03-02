export default (e: MouseEvent) => {
  const bodyStyle = window.getComputedStyle(document.body)
  let marginLeft = 0
  let marginTop = 0
  if (bodyStyle.position !== 'static') {
    if (bodyStyle.marginLeft && bodyStyle.marginLeft !== '0px') {
      marginLeft = Number(bodyStyle.marginLeft.replace('px', ''))
    }
    if (bodyStyle.marginTop && bodyStyle.marginTop !== '0px') {
      marginTop = Number(bodyStyle.marginTop.replace('px', ''))
    }
  }

  return {
    top: e.pageY - marginTop,
    left: e.pageX - marginLeft,
  }
}
