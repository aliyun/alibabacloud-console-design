import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect as reduxConnect } from 'dva'
import { NAMESPACE, getActiveId, getRemoteDataSource } from './model'
import mapRegionListToIds from './mapRegionListToIds'
import renderProps from './renderProps'

const mapStateToProps = state => ({
  /**
   * 当前的 region id
   * @type {?String}
   */
  activeId: getActiveId(state),

  /**
   * 远程数据列表
   * @see https://fecs.console.aliyun.com/api/topbar/showRegionList.json
   * @type {?Array<Object>}
   */
  remoteDataSource: getRemoteDataSource(state),
})

const mapDispatchToProps = dispatch => ({
  dispatch,

  /**
   * 更新 model 中的 region id
   * @param {String} id 待更新的 region id
   */
  dispatchChangeAction(id) {
    dispatch({
      type: `${NAMESPACE}/change`,
      payload: id,
    })
  },

  /**
   * 获取并更新远程数据列表
   * @param {Array<String>} dataSource 包含 region id 的列表
   */
  dispatchFetchAction(dataSource) {
    const ids = mapRegionListToIds(dataSource)
    dispatch({
      type: `${NAMESPACE}/fetch`,
      payload: ids,
    })
  },
})

class RenderModelProps extends PureComponent {
  static propTypes = {
    activeId: PropTypes.string,
    remoteDataSource: PropTypes.arrayOf(PropTypes.any),
    dispatchChangeAction: PropTypes.func,
    dispatchFetchAction: PropTypes.func,
    dispatch: PropTypes.func,
    render: PropTypes.func,
    children: PropTypes.func,
  }

  render() {
    const { render, children, ...restProps } = this.props
    return renderProps(this.props)(restProps)
  }
}

const connect = reduxConnect(mapStateToProps, mapDispatchToProps)

/**
 * @type {Function}
 * @returns {Component}
 */
export default connect

/**
 * @type {Component}
 */
export const Connection = connect(RenderModelProps)
