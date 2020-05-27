import React, { Component } from 'react'
import PropTypes from 'prop-types'
import warning from '@alicloud/xconsole-dev-utils/lib/warning'
import Context from './Context'
import determinActiveId from './determineActiveId'
import renderProps from './renderProps'

class Provider extends Component {
  static propTypes = {
    /**
     * 当前的 region id
     * @type {String}
     */
    activeId: PropTypes.string,

    /**
     * 需要进行更新的 region id
     * 在 Provider 的 didMount 和 didUpdate 生命周期函数内,
     * 会针对 nextActiveId 做检查, 如果该值是一个有效值,
     * 则会执行 onChange 事件, 并触发默认行为 dispatchChangeAction
     * @type {String}
     */
    nextActiveId: PropTypes.string,

    /**
     * 是否自动获取远程数据源
     * 当该值显式指定为 `true`, 则会在 didMount 生命周期触发 dispatchFetchAction
     * 主动获取远程数据源
     * @type {Boolean}
     */
    remoteable: PropTypes.bool,

    /**
     * 在 activeId 数据变化时, 是否保持 Provider 下的子组件的生存周期
     *
     * 该值默认为 `false`, 即在发生变化时, 通过 render null 将所有的子组件清除,
     * 这样做的原因是在数据变化的过程中, 避免执行子组件的一些行为 (如根据 activeId
     * 获取远程数据等), 来确保数据的正确性. 由于视图需要进行重新计算并绘制, 会损失
     * 一定的性能, 但仍然建议禁用 keepAlive 来确保数据和事件触发的正确性.
     *
     * 如果希望保持子组件的生存周期, 请显式指定 `true` 并在子组件内确保数据和事件
     * 触发的正确性
     *
     * @type {Boolean}
     * @default false
     */
    keepAlive: PropTypes.bool,

    /**
     * 数据列表
     * @type {Array}
     */
    dataSource: PropTypes.arrayOf(PropTypes.any),

    /**
     * 远程数据列表
     * @type {Array}
     */
    remoteDataSource: PropTypes.arrayOf(PropTypes.any),

    /**
     * 触发远程数据的获取 (依赖于 redux.connect 高阶组件为该属性赋值)
     * @type {Function}
     * @param {Array} dataSource
     */
    dispatchFetchAction: PropTypes.func,

    /**
     * 触发 activeId 的变化 (依赖于 redux.connect 高阶组件为该属性赋值)
     * @type {Function}
     * @param {String} nextActiveId
     */
    dispatchChangeAction: PropTypes.func,

    /**
     * 在触发变化之前的拦截器, 可以对将要变化的 activeId 进行预处理
     * @type {Function}
     * @param {String} nextActiveId
     * @return {String} processedNextActiveId
     */
    changeInterceptor: PropTypes.func,

    /**
     * 在 activeId 变化时触发的事件函数
     * @type {Function}
     */
    onChange: PropTypes.func,

    /**
     * 代理 Provider 下的 SmartRegion 的点击事件
     * @type {Function}
     */
    onItemClick: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    component: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    render: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    children: PropTypes.node,
  }

  static defaultProps = {
    keepAlive: false,
  }

  componentDidMount() {
    this.update()
    this.fetchRemoteList()
  }

  componentDidUpdate() {
    this.update()
  }

  onItemClick = this.onItemClick.bind(this)

  onItemClick(id) {
    const { onItemClick: propsOnItemClick } = this.props
    if (propsOnItemClick) {
      // 如果显式声明了 `onItemClick` 事件代理, 并显式返回了 `false`
      // 则直接返回避免执行默认行为 `onChange`
      const preventDefault = propsOnItemClick(id) === false
      if (preventDefault) {
        return
      }
    }

    this.onChange(id)
  }

  onChange(id) {
    const {
      activeId,
      dataSource,
      onChange: propsOnChange,
      dispatchChangeAction,
      changeInterceptor,
    } = this.props

    // 使用预处理
    const nextActiveId = changeInterceptor ?
      changeInterceptor(id, {
        activeId,
        dataSource,
      }) : id

    if (nextActiveId === activeId) {
      return
    }

    const exactNextActiveId = determinActiveId(
      nextActiveId,
      activeId,
      dataSource
    )

    if (nextActiveId !== exactNextActiveId) {
      // 如果 nextActiveId 显式地进行了声明并且不符合预期, 则在 dev 环境下提示
      warning(
        typeof nextActiveId === 'undefined',
        `Next active id (${nextActiveId}) is unexpected. ` +
        'You can define a interceptor (props.changeInterceptor)' +
        'to correct the next active id before change.'
      )
      return
    }

    // 如果显式地声明了 `onChange` 并且执行结果为 `false`
    // 则阻止执行默认行为 `dispatchChangeAction`
    if (propsOnChange) {
      const preventDefault = propsOnChange(nextActiveId) === false
      if (preventDefault) {
        return
      }
    }

    dispatchChangeAction && dispatchChangeAction(nextActiveId)
  }

  fetchRemoteList() {
    const { remoteable, dispatchFetchAction, dataSource } = this.props
    if (remoteable && dispatchFetchAction) {
      dispatchFetchAction(dataSource)
    }
  }

  update() {
    const { nextActiveId } = this.props
    this.onChange(nextActiveId)
  }

  render() {
    const {
      activeId,
      nextActiveId,
      dispatchChangeAction,
      keepAlive,
      dataSource,
      remoteDataSource,
    } = this.props

    // 在数据变化时, 销毁子组件并重新进行渲染
    // 可以通过设置 `props.keepAlive = true` 阻止子组件的销毁
    if (!keepAlive && nextActiveId && nextActiveId !== activeId) {
      return null
    }

    const providerValue = {
      activeId,
      nextActiveId,
      dataSource,
      remoteDataSource,
      dispatchChangeAction,
      onItemClick: this.onItemClick,
    }

    return (
      <Context.Provider value={providerValue}>
        {renderProps(this.props)(providerValue)}
      </Context.Provider>
    )
  }
}

export default Provider
