let uuid = 1;

export const getComponentName = (namePath: string) =>
  namePath
  .replace(/\.\./g, '')
  .replace(/(\\|\/)/g, '/')
  .replace(/[-.$:]/g, `_${uuid++}_`)
  .replace(/(\/(\w))/g, m => m.toUpperCase())
  .replace(/(\/(\w))/g, '$2');