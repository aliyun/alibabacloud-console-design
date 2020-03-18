/**
 * 分页获取迭代列表
 */

import { createService } from '@alicloud/xconsole'

const PRODUCT = 'consolebench';

export default async (variables) => {
  const vars = Object.assign({}, {
    Id: variables.app,
  })
  const result = await createService(
    PRODUCT,
    'DescribeApp',
    {
      ignoreError: true,
    }
  )(vars)
  return result || {}
}
