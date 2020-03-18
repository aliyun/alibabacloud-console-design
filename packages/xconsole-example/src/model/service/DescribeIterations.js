/**
 * 分页获取迭代列表
 */

import { createService } from '@alicloud/xconsole'

const PRODUCT = 'consolebench';

export default async (variables) => {
  const vars = Object.assign({}, {
    AppId: variables.app,
    Page: 1,
    PageSize: 10,
  })
  const result = await createService(
    PRODUCT,
    'DescribeIterations'
  )(vars)

  return result
}
