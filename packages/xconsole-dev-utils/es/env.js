/* eslint-disable import/prefer-default-export */
var env;

try {
  env = process.env.NODE_ENV;
} catch (err) {} // eslint-disable-line no-empty


var isProduction = function isProduction() {
  return env === 'production';
};

export { isProduction };