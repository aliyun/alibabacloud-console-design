import { createSelector } from 'reselect'
import {
  getActiveId as getActiveIdFromCookie,
  setActiveId as setActiveIdToCookie,
} from './cookie'
import fallback from './data/fallback'
import { getRegionList } from './service'

const NAMESPACE = '@@wind-rc-region'

export default {
  namespace: NAMESPACE,
  state: {
    /**
     * 当前 region id
     * 默认从 cookie 中进行获取. 在用户第一次访问控制台时, 该值可能为 `undefined`
     * 使用 `RegionContext(Route)` 可以将当前的 dataSource 中的第一个 region id
     * 作为当前 region id 并使用 model.change 接口更新 cookie 和 model 中的值
     * @type {String=}
     */
    activeId: getActiveIdFromCookie(),

    /**
     * 远程的数据源
     * 默认使用兜底数据, 当调用 model.fetch 接口时将异步获取数据并更新该值
     * 使用 `RegionContext(Route)` 中的 `remoteable: Boolean` 属性可以定义当前
     * 上下文初始化时是否自动获取远程数据, 配合 `SmartRegion` 组件可以进行远程数据的
     * 合并和分组, 优化前端显示
     * @type {Array=}
     */
    remoteDataSource: fallback,
  },
  reducers: {
    /**
     * 更新数据
     * @param {Object} state
     * @param {Object} action
     */
    update(state, action) {
      const { payload = {} } = action
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {
    /**
     * 改变当前的 region id
     * @param {Object} action
     * @param {Object} effect
     */
    * change(action, effect) {
      const {
        payload: id,
        meta: {
          syncCookie = true,
          cookieKey = 'activeRegionId',
        } = {},
      } = action
      const { put } = effect

      if (syncCookie) {
        setActiveIdToCookie(id, { key: cookieKey })
      }

      yield put({ type: 'update', payload: { activeId: id } })
    },

    /**
     * 从远程数据源 (公共服务) 获取 region 列表
     * fetch url:
     * https://fecs.console.aliyun.com/api/topbar/showRegionList.json
     * @param {Object} action
     * @param {Object} effect
     */
    * fetch(action, effect) {
      const {
        payload: ids,
      } = action
      const { put, call } = effect

      let remoteDataSource
      try {
        remoteDataSource = yield call(getRegionList, [ids])
      } catch (err) {
        console.warn(err)
      }

      if (remoteDataSource) {
        yield put({
          type: 'update',
          payload: {
            remoteDataSource,
          },
        })
      }
    },
  },
}

/**
 * @param {Object} state
 */
const getState = state => state[NAMESPACE]

/**
 * 获取当前的 region id
 * @param {Object} state
 */
const getActiveId = createSelector(
  getState,
  state => state.activeId
)

/**
 * 获取远程数据列表内容
 * @param {Object} state
 */
const getRemoteDataSource = createSelector(
  getState,
  state => state.remoteDataSource
)

export {
  NAMESPACE,
  getActiveId,
  getRemoteDataSource,
}
