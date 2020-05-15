const FIELD_NAME = {
  NAME: 'name',
  TIME: 'time',
  FAKE_FAIL: 'fake_fail',
  LOCK_TIME: 'lock_time',
  LOCK_USE_LOADING: 'lock_use_loading'
};

function getFieldDefaults() {
  return {
    [FIELD_NAME.NAME]: '',
    [FIELD_NAME.TIME]: 2,
    [FIELD_NAME.FAKE_FAIL]: false,
    [FIELD_NAME.LOCK_TIME]: 3,
    [FIELD_NAME.LOCK_USE_LOADING]: false
  };
}

export {
  FIELD_NAME,
  getFieldDefaults
};
