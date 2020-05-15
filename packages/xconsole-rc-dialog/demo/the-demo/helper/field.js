import _some from 'lodash/some';
import _isEqual from 'lodash/isEqual';

function validateField(field, gimmeError) {
  return new Promise((resolve, reject) => field.validate((errors, values) => {
    if (errors) {
      reject(gimmeError ? errors : undefined);
    }
    
    resolve(values);
  }));
}

function fieldHasError(field) {
  return _some(field.getErrors(), v => v);
}

function fieldEquals(field, values) {
  return _isEqual(field.getValues(), values);
}

// 为了方便 demo 而放在这里的，实际的应用中应该放在一个更通用的地方
export {
  validateField,
  fieldHasError,
  fieldEquals
};
