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
  linkId?: string;

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
  shape?: 'text' | 'button';

  /**
   * 
   */
  type?: 'normal' | 'primary';

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

  text?: boolean;
}

export const useChannelLink = (linkId: string, linkParams: Record<string, any>) => {
  if (typeof linkId === 'undefined') {
    throw new Error(
      '[ChannelLink] linkId is required'
    )
  }

  const { consoleConfig } = React.useContext(ConsoleContext)
  let channelLink = consoleConfig.getChannelLink(linkId)

  if (linkParams) {
    channelLink = template(channelLink)(linkParams)
  }
  return channelLink;
}

const ChannelLink: React.FC<IChannelLinkProps> = (props: IChannelLinkProps) => {
  const {linkId, linkParams, pure, ...restProps } = props;

  if (!linkId) {
    return <Link {...restProps} />
  }

  const channelLink = useChannelLink(linkId, linkParams);
  if (pure) return <>channelLink</>;
  return <Link href={channelLink} target="_blank" {...restProps} />
}

ChannelLink.displayName = 'ChannelLink'

export default ChannelLink;
