import { intl } from '@alicloud/xconsole'

export const strategyDataSource = [
  {
    value: '0',
    label: intl('deploy.strategy.all'),
  },
  {
    value: '1',
    label: intl('deploy.strategy.partial'),
  },
]

export const regionDataSource = [
  {
    value: 'cn-qingdao',
    label: '华北1',
  },
  {
    value: 'cn-beijign',
    label: '华北2',
  },
  {
    value: 'cn-shanghai',
    label: '华东1',
  },
  {
    value: 'cn-hangzhou',
    label: '华东2',
  },
]

export const chargeDataSource = [
  {
    value: 'Postpay',
    label: intl('chargetype.postpay'),
  },
  {
    value: 'Prepaid',
    label: intl('chargetype.prepaid'),
  },
]

export const periodDataSource = [
  {
    value: 1,
    label: intl('period.1'),
  },
  {
    value: 2,
    label: intl('period.2'),
  },
  {
    value: 3,
    label: intl('period.3'),
  },
]
