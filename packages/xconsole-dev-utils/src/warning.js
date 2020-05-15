/* eslint-disable import/no-mutable-exports */

import { isProduction } from './env'

let warning = () => {}

// Just warning on dev environment
if (!isProduction()) {
  const printWarning = (format, ...args) => {
    let argIndex = 0
    // eslint-disable-next-line no-plusplus
    const message = `Warning: ${format.replace(/%s/g, () => args[argIndex++])}`
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      throw new Error(message);
    } catch (x) {} // eslint-disable-line no-empty
  }

  warning = (condition, format, ...args) => {
    if (typeof format === 'undefined') {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      )
    }
    if (!condition) {
      printWarning(format, ...args)
    }
  }
}

export default warning
