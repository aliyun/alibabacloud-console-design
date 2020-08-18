import resolvePathname from 'resolve-pathname'
import compose from 'recompose/compose'
import branch from 'recompose/branch'
import withProps from 'recompose/withProps'
import mapProps from 'recompose/mapProps'
import { withRouter } from 'dva/router'

const transRelativeUrl = withProps((props) => {
  const { to, location } = props
  const { pathname } = location
  const exactPathname = pathname[pathname.length - 1] === '/' ?
    pathname : `${pathname}/`
  let combinedProps = {}

  if (to) {
    combinedProps = {
      ...combinedProps,
      to: resolvePathname(to, exactPathname),
    }
  }

  return combinedProps
})

const cleanProps = mapProps((props) => {
  const {
    history,
    match,
    location,
    staticContext,
    relative,
    ...restProps
  } = props

  return restProps
})

const withRelativeUrl = compose(
  withRouter,
  transRelativeUrl,
  cleanProps
)

const isRelative = props => props.relative === true

const relative = branch(isRelative, withRelativeUrl)

export default relative
