import React, { Fragment, useState, useMemo } from 'react'
import { Icon, Dropdown, Menu, Tag } from '@alicloud/xconsole/ui'

import {
  GetAppList,
} from '~/model'

import {
  ROUTERS,
} from '~/constants'
import {
  getRoutePath,
} from '~/utils/helper'

import './index.less'


export default (props) => {
  const {
    title,
    subTitle,
    extra = <></>,
    children,
    footer,
    className,
    ...restProps
  } = props;

  return (
    <div className={`rc-card ${className}`} {...restProps}>
      <div className="rc-card-header">
        {title}
        <Dropdown
          triggerType="click"
          align="tr br"
          trigger={<Icon className="rc-card-header-expander" type="ellipsis-vertical" size="small" />}
        >
          {extra || <></>}
        </Dropdown>
      </div>
      <div className="rc-card-cont">
        {children}
      </div>
      { footer ?
        (<div className="rc-card-footer">
          {footer}
        </div>) : null
      }

    </div>
  )
}

