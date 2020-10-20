import React, { useContext } from 'react'

import { Page, Description } from '@ali/xconsole/ui'
import { intl, ConsoleContext } from '@ali/xconsole'

export default () => {
  const { consoleConfig } = useContext(ConsoleContext);
  return (
    <Page
      title={intl('nav.basic.tech.console_config')}
      breadcrumbs={[
        {
          to: '/',
          text: intl('title.home'),
        },
        {
          text: intl('nav.basic.tech.console_config'),
        },
      ]}
    >
      <Description
        title="用户相关"
        items={[{
          dataIndex: 'mainAccountPK',
          label: '当前用户 UID',
        },{
          dataIndex: 'currentPK',
          label: '当前用户主账号 UID',
        },{
          dataIndex: 'lang',
          label: '当前用户语言',
        },{
          dataIndex: 'locale',
          label: '当前用户地域',
        },{
          dataIndex: 'accountType',
          label: '当前账号类型',
        }]}
        dataSource={{
          mainAccountPK: consoleConfig.getMainAccountPK(),
          currentPK: consoleConfig.getCurrentPK(),
          lang: consoleConfig.getLang(),
          locale: consoleConfig.getLocale(),
          accountType: consoleConfig.getAccountType(),
        }}
      />

      <Description
        title="渠道相关"
        extra={<pre>渠道是阿里云云产品输出的出口，渠道类型分为 阿里云 虚商 专有域 三种渠道类型，每种渠道由于特点不同，需要屏蔽一些功能，或者跳转的链接不一样，导致需要通过渠道开关和渠道链接来区分。</pre>}
        items={[{
          dataIndex: 'channel',
          label: '获取当前渠道',
        },{
          dataIndex: 'channelLink',
          label: '获取渠道链接',
          render: (value) => <><b>consoleConfig.getChannelLink('oss:console')</b> 对应的渠道链接: {value}</>,
          // @ts-ignore
          span: 24,
        },{
          dataIndex: 'channelStatus',
          label: '获取渠道开关',
          render: (value) => <span><b>consoleConfig.getChannelFeature('feat:api_logger')</b> 对应的渠道开关状态: {value}</span>,
          // @ts-ignore
          span: 24,
        }]}
        dataSource={{
          channel: consoleConfig.getChannel(),
          channelLink: consoleConfig.getChannelLink('oss:console'),
          channelStatus: consoleConfig.getChannelFeature('feat:api_logger').status.toString()
        }}
      />

      <Description
        title="其他配置"
        items={[{
          dataIndex: 'channel',
          label: '功能灰度',
        },{
          dataIndex: 'channelLink',
          label: '开通状态',
          // @ts-ignore
          span: 24,
        },{
          dataIndex: 'staticApi',
          label: 'STATIC API',
          // @ts-ignore
          span: 24,
        },{
          dataIndex: 'channelStatus',
          label: '获取渠道开关',
          // @ts-ignore
          span: 24,
        },{
          label: '规则中心',
          // @ts-ignore
          span: 24
        },{
          label: '用户标签',
          // @ts-ignore
          span: 24
        }]}
        dataSource={{
          channel: consoleConfig.getChannel(),
          channelLink: consoleConfig.getChannelLink('oss:console'),
        }}
      />
    </Page>
  )
};

