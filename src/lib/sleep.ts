export default (time: number) =>
  new Promise<void>((rs) => {
    setTimeout(() => {
      rs()
    }, time)
  })
