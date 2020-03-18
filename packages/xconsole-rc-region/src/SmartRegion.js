import { compose, mapProps, withProps } from 'recompose'
import { union, intersection } from './data/transform'
import Region from './Region'
import withRegion from './withRegion'

/**
 * Hijack `onItemClick` prop as higher-order component
 * @param {Component}
 * @returns {Component}
 */
const hijackOnItemClick = mapProps((ownerProps) => {
  const { region, ...restProps } = ownerProps
  const { onItemClick, ...restRegionProps } = region

  return {
    ...restProps,
    ...restRegionProps,
    onItemClick(...args) {
      const { onItemClick: propOnItemClick } = ownerProps
      if (propOnItemClick) {
        const preventDefault = propOnItemClick(...args) === false
        if (preventDefault) {
          return
        }
      }
      onItemClick && onItemClick(...args)
    },
  }
})

/**
 * Determine suited shape as higher-order component
 * @param {Component}
 * @returns {Component}
 */
const smartShape = withProps((ownerProps) => {
  const { portal } = ownerProps
  if (portal === true) {
    return { shape: 'dropdown' }
  }
  return null
})

/**
 * Transform data-source by remote data and shape as higher-order component
 * @param {Component}
 * @returns {Component}
 */
const transformDataSource = withProps((ownerProps) => {
  const { dataSource, remoteDataSource, shape, transformer } = ownerProps
  if (remoteDataSource) {
    // User can define a transformer as function to transform data-source
    // In the other hand, default transformer will take effect by `shape` prop
    const exactTransformer = transformer || (
      shape === 'dropdown' ? union : intersection
    )
    return exactTransformer ? {
      dataSource: exactTransformer(remoteDataSource, dataSource),
    } : null
  }
  return null
})

const enhance = compose(
  smartShape,
  withRegion,
  hijackOnItemClick,
  transformDataSource,
)

const SmartRegion = enhance(Region)

export default SmartRegion
