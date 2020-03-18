/* eslint-disable import/prefer-default-export */

let env

try {
  env = process.env.NODE_ENV
} catch (err) {} // eslint-disable-line no-empty

const isProduction = () => env === 'production'

export {
  isProduction,
}
