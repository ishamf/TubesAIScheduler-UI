export function flow (...fns) {
  return (x) => fns.reduce((acc, f) => f(acc), x)
}

export function merge (...objs) {
  return Object.assign({}, ...objs)
}
