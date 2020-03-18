import React from 'react'
import PropTypes from 'prop-types'
import { ConsoleBaseContext } from '@alicloud/xconsole-console-base-context'
import get from 'lodash.get'
import template from 'lodash.template'
import Link from '@alicloud/xconsole-rc-base-link'
import '@alicloud/xconsole-rc-base-link/dist/index.css';
import './index.less'

const XConsoleRcLink = ({
  linkId,
  linkParams,
  pure,
  ...restProps
}) => {
  if (linkId) {
    const { links } = React.useContext(ConsoleBaseContext)
    let channelLink = get(links, linkId)
    if (linkParams) {
      channelLink = template(channelLink)(linkParams)
    }
    if (pure) return channelLink
    return <Link href={channelLink} target="_blank" {...restProps} />
  } else {
    return <Link {...restProps} />
  }
}

XConsoleRcLink.displayName = 'XConsoleRcLink'

XConsoleRcLink.propTypes = {
  linkId: PropTypes.string,
  linkParams: PropTypes.objectOf(PropTypes.any),
}

export default XConsoleRcLink
