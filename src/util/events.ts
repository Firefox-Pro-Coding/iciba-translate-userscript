type Listener = (...args: Array<any>) => unknown

export class EventEmitter {
  private m: Record<string, Array<Listener>> = {}

  public on(e: string, l: Listener) {
    this.m[e] = this.m[e] ?? []
    this.m[e].push(l)
  }

  public off(e: string, l: Listener) {
    if (this.m[e]) {
      const index = this.m[e].indexOf(l)
      if (index !== -1) {
        this.m[e].splice(index, 1)
      }
    }
  }

  public emit(e: string, payload: any) {
    if (this.m[e]) {
      this.m[e].forEach((l) => l(payload))
    }
  }
}
