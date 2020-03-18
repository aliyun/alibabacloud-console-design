import React, { Fragment, useState, useMemo } from 'react'
import { intl, PageHeader, Link, Query } from '@alicloud/xconsole'
import { Icon, Tag, Message, Loading } from '@alicloud/xconsole/ui'

import Card from '~/components/Card';
import XQuery from '~/components/xQuery';

import {
  GetIsvSlsUrl,
} from '~/model'

import {
  ROUTERS,
} from '~/constants'
import {
  getRoutePath,
} from '~/utils/helper'


import './index.less'


export default () => {
  const [slsUrl, setUrl] = useState('');

  return (
    <XQuery
      model={GetIsvSlsUrl}
      variables={{ appName: '123' }}
      onData={(data, all) => {
        console.log('debugme GetIsvSlsUrl data', data);
        setUrl(data);
      }}
    >
      <XQuery.Error>
        <Message type="error">服务端返回错误，请刷新重试!</Message>
      </XQuery.Error>
      <XQuery.Loading>
        <Loading style={{ display: 'block', marginTop: '60px' }} />
      </XQuery.Loading>
      <XQuery.Default>
        <PageHeader
          title={
            <Fragment>
              {intl('menu.title.dashboard')}
            </Fragment>
        }
          breadcrumbs={[
            {
              to: getRoutePath(ROUTERS.HOME),
              text: intl('title.home'),
            },
            {
              text: intl('menu.title.dashboard'),
            },
          ]}
        >
          {
            slsUrl ?
            <iframe src={slsUrl} frameBorder="0" marginHeight="0" marginWidth="0" scrolling="auto" width="100%" height="100%" /> :
            null
          }
        </PageHeader>
      </XQuery.Default>
    </XQuery>

  )
}

