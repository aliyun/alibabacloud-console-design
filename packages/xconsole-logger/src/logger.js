import get from 'lodash.get'
import map from 'lodash.map'
import reduce from 'lodash.reduce'
import { getChecksum, matchPathRules } from './utils'
import {
  SPMA,
  GOLDLOG_SETPAGESPM,
  GOLDLOG_SENDPV,
} from './constants'


export const logSpm = (spma, spmb) => {
  try {
    const queue = get(window, 'goldlog_queue', [])
    const checksum = getChecksum(spma, spmb)
    queue.push({
      action: GOLDLOG_SETPAGESPM,
      arguments: [spma, spmb],
    });
    queue.push({
      action: GOLDLOG_SENDPV,
      arguments: [
        {
          checksum,
          is_auto: false,
        },
      ],
    });
  } catch (error) {}
}

export const setArmsPage = function (path) {
  try {
    window.__bl && window.__bl.setPage && window.__bl.setPage(path, false)
  } catch (error) {}
}

export default class {
  constructor({
    spma = SPMA,
    global = {},
    routeConfigs = [],
  }) {
    this.spma = spma
    // 这里需要将 prefix 加到路径上
    this.pathRules = map(routeConfigs, config => `${global.prefix || ''}/${config.path}`)
    this.logConfig = reduce(routeConfigs, (result, current) => ({
      ...result,
      [`${global.prefix || ''}/${current.path}`]: get(current, 'config.spmb'),
    }), {})
  }

  log(pathname) {
    const path = matchPathRules(this.pathRules, pathname)
    const spmb = get(this.logConfig, path)

    if (spmb) {
      logSpm(this.spma, spmb)
    }
    setArmsPage(path)
  }
}
