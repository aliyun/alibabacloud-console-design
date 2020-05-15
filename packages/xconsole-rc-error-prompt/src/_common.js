const FIELD_NAME = {
  INDEX: 'index'
};

function getFieldDefaults() {
  return {
    [FIELD_NAME.INDEX]: 0
  };
}

export {
  FIELD_NAME,
  getFieldDefaults
};