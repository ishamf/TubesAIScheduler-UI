export function flow (...fns) {
  return (x) => fns.reduce((acc, f) => f(acc), x)
}

export function merge (...objs) {
  return Object.assign({}, ...objs)
}

export function ensureReturnFalse (f) {
  return (...args) => {
    f(...args)
    return false
  }
}
