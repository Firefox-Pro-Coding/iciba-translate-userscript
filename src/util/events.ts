type Listener = (...args: Array<any>) => unknown

export class EventEmitter {
  private map: Record<string, Array<Listener>> = {}

  public on(e: string, l: Listener) {
    this.map[e] = this.map[e] ?? []
    this.map[e].push(l)
  }

  public off(e: string, l: Listener) {
    if (this.map[e]) {
      const index = this.map[e].indexOf(l)
      if (index !== -1) {
        this.map[e].splice(index, 1)
      }
    }
  }

  public emit(e: string, payload: any) {
    if (this.map[e]) {
      this.map[e].forEach((l) => l(payload))
    }
  }
}
