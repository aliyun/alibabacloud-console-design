import React from 'react'
import template from 'lodash/template'
import { ConsoleContext } from '../context/Context'
// @ts-ignore
import Link from '@alicloud/xconsole-rc-base-link'
import '@alicloud/xconsole-rc-base-link/dist/index.css';


export interface IChannelLinkProps {
  /**
   * 
   */
  linkId: string;

  /**
   * 
   */
  linkParams?: Record<string, any>;

  /**
   * 
   */
  pure?: boolean;

  /**
   * 
   */
  disabled?: boolean;

  /**
   * 
   */
  visible?: boolean;

  /**
   * 
   */
  shape?: 'text';

  /**
   * 
   */
  type?: 'normal';

  /**
   * 
   */
  size?: 'medium';

  /**
   * 
   */
  to?: string;

  /**
   * 
   */
  href?: string;
}

const ChannelLink: React.FC<IChannelLinkProps> = (props: IChannelLinkProps) => {
  const {linkId, linkParams, pure, ...restProps } = props;

  if (linkId) {
    const { consoleConfig } = React.useContext(ConsoleContext)
    let channelLink = consoleConfig.getChannelLink(linkId)

    if (linkParams) {
      channelLink = template(channelLink)(linkParams)
    }

    if (pure) return <>channelLink</>;

    return <Link href={channelLink} target="_blank" {...restProps} />
  } else {
    return <Link {...restProps} />
  }
}

ChannelLink.displayName = 'ChannelLink'

export default ChannelLink;
