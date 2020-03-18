export const takeLatest = fn => ([fn, { type: 'takeLatest' }])

export const throttle = (fn, ms) => ([fn, { type: 'throttle', ms }])

export const watcher = fn => ([fn, { type: 'watcher' }])
