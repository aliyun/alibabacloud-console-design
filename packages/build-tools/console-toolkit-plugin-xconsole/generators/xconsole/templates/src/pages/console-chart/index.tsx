import React from 'react'
import { intl } from '@ali/xconsole'
import { PageHeader } from '@ali/xconsole/ui'
import ChartComponent from '~/components/ConsoleChart';

export default () => (
  <PageHeader
    title={intl('nav.basic.ui.chart')}
    breadcrumbs={[
      {
        to: '/',
        text: intl('title.home'),
      },
      {
        text: intl('title.chartlist'),
      },
    ]}
  >
    <ChartComponent />
  </PageHeader>
);
