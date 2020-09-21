const handleScroll = (_e: Event) => {
  const e = _e as WheelEvent
  const el = e.currentTarget as Element
  if (!el) {
    return
  }
  const scrollBox = el
  if (scrollBox) {
    // scroll down
    if (e.deltaY > 0 && scrollBox.scrollTop >= scrollBox.scrollHeight - scrollBox.clientHeight) {
      e.preventDefault()
    }

    // scroll up
    if (e.deltaY < 0 && scrollBox.scrollTop === 0) {
      e.preventDefault()
    }
  }
}


export default {
  mounted(el: Element) {
    el.addEventListener('wheel', handleScroll)
  },
  unmounted(el: Element) {
    el.removeEventListener('wheel', handleScroll)
  },
}
