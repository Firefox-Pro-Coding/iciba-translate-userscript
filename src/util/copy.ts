const copy = <T>(p: T) => (typeof p === 'object' ? JSON.parse(JSON.stringify(p)) : p) as T
export default copy
