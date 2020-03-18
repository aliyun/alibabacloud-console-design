import React from 'react'
import PropTypes from 'prop-types'
import { Select } from '@alicloud/xconsole/ui'

const VersionsSelector = ({
  app,
  value,
  versions,
  onChange,
  ...selectProps
}) => {
  const versionData = versions;

  if (versionData.length === 0) {
    return '未能获取到有效的构建版本'
  }

  // if (loading && !(error instanceof Error)) {
  //   return '正在获取数据'
  // }

  // if ((error instanceof Error)) {
  //   return '接口请求出错了'
  // }


  if (versionData.length === 1) {
    return (
      <Select
        style={{ width: '100%' }}
        initialValue={versionData[0].value}
        defaultValue={versionData[0].value}
        dataSource={versionData}
        onChange={_value => onChange(_value)}
        {...selectProps}
      />
    )
  }
}

VersionsSelector.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export default VersionsSelector
