export const getSelectionText = () => {
  const selection = window.getSelection()
  if (selection && String(selection)) {
    return selection.toString().trim()
  }

  const active = document.activeElement
  if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) {
    const start = active.selectionStart
    const end = active.selectionEnd
    if (typeof start === 'number' && typeof end === 'number') {
      const s = active.value.substring(start, end)
      return s.trim()
    }
  }

  return ''
}
