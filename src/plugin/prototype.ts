/** fix prototype.js Array.prototype.toJSON pollution */

if ((Array.prototype as any).toJSON) {
  delete (Array.prototype as any).toJSON
}
