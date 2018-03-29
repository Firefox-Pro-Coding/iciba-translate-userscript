import * as path from 'path'
import * as rimraf from 'rimraf'

rimraf(path.join(__dirname, '../tsc_dist'), (err) => {
  if (err) {
    // tslint:disable-next-line no-console
    console.error(err)
  }
})
