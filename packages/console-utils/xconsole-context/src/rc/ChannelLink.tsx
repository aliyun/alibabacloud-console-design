import React, { useContext } from 'react';
import Link from '@alicloud/xconsole-rc-base-link';
import '@alicloud/xconsole-rc-base-link/dist/index.css';

import { ConsoleContext } from '../context/Context';

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
  const { consoleConfig } = useContext(ConsoleContext);

  return consoleConfig.getChannelLink(linkId, linkParams);
};

const ChannelLink: React.FC<IChannelLinkProps> = (props: IChannelLinkProps) => {
  const { linkId, linkParams, pure, ...restProps } = props;

  const channelLink = useChannelLink(linkId, linkParams);

  if (!linkId) return <Link {...restProps} />;
  if (pure) return <>{channelLink}</>;

  return <Link href={channelLink} target="_blank" {...restProps} />;
};

ChannelLink.displayName = 'ChannelLink';

export default ChannelLink;
