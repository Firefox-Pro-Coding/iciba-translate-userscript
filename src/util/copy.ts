const copy: <T>(p: T) => T = (p: any) => (typeof p === 'object' ? JSON.parse(JSON.stringify(p)) : p)
export default copy
