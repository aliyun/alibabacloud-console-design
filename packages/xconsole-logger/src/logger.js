import get from 'lodash.get'
import map from 'lodash.map'
import reduce from 'lodash.reduce'
import { getChecksum, matchPathRules } from './utils'
import {
  SPMA,
  GOLDLOG_SETPAGESPM,
  GOLDLOG_SENDPV,
} from './constants'


const logSpm = (spma, spmb) => {
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

const setArmsPage = function (path) {
  try {
    window.__bl && window.__bl.setPage && window.__bl.setPage(path, false)
  } catch (error) {}
}

export default class {
  constructor({
    spma = SPMA,
    routeConfigs = [],
  }) {
    this.spma = spma
    this.pathRules = map(routeConfigs, config => `/${config.path}`)
    this.logConfig = reduce(routeConfigs, (result, current) => ({
      ...result,
      [`/${current.path}`]: get(current, 'config.spmb'),
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
