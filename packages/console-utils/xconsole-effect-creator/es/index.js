export var takeLatest = function takeLatest(fn) {
  return [fn, {
    type: 'takeLatest'
  }];
};
export var throttle = function throttle(fn, ms) {
  return [fn, {
    type: 'throttle',
    ms: ms
  }];
};
export var watcher = function watcher(fn) {
  return [fn, {
    type: 'watcher'
  }];
};