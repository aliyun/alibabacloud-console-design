import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Step, Grid } from '@alicloud/console-components'
import map from 'lodash.map'
import get from 'lodash.get'
import reduce from 'lodash.reduce'
import findIndex from 'lodash.findindex'
import isFunction from 'lodash.isfunction'
import isUndefined from 'lodash.isundefined'
import './index.less'

const XconsoleRcStep = ({
  items,
  children,
  shape = 'circle',
  labelPlacement = 'horizontal',
  ...restProps
}) => {
  if (isUndefined(items)) {
    throw new Error('[XConsole Step] items is required')
  }
  if (isUndefined(children)) {
    throw new Error('[XConsole Step] children is required')
  }
  const [current, setCurrent] = useState(0)
  const [variables, setVariables] = useState({})
  const onNext = (variable) => {
    setCurrent(current + 1)
    const key = items[current].key
    setVariables({
      ...variables,
      [key]: variable,
    })
  }

  const onPrev = () => {
    setCurrent(current - 1)
  }

  const onGo = (key) => {
    const index = findIndex(items, item => item.key === key)
    setCurrent(index)
  }

  const getVariables = () => reduce(variables, (result, cur) => ({
    ...result,
    ...cur,
  }), {})

  const getVariable = key => get(getVariables(), key)


  const step = {
    current: items[current].key,
    getVariable,
    getVariables,
    variables,
    next: onNext,
    prev: onPrev,
    go: onGo,
  }

  return (
    <Grid.Row wrap>
      <Grid.Col span="24">
        <Step
          current={current}
          shape={shape}
          labelPlacement={labelPlacement}
          {...restProps}
        >
          {
            items && map(items, ({ key, title, onClick }) => (
              <Step.Item
                key={key}
                title={title}
                onClick={() => onClick(step)}
              />
            ))
          }
        </Step>
      </Grid.Col>
      <Grid.Col span="24" align="center">
        {
          isFunction(children) && children(step)
        }
      </Grid.Col>
    </Grid.Row>
  )
}

XconsoleRcStep.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  children: PropTypes.func,
  shape: PropTypes.string,
  labelPlacement: PropTypes.string,
}

export default XconsoleRcStep
