/**
 * 分页获取迭代列表
 */

import { createService } from '@alicloud/xconsole'

const PRODUCT = 'consolebench';

export default async (variables) => {
  const vars = Object.assign({}, {
    isvCode: 1,
    appCode: 1,
  })
  const result = await createService(
    PRODUCT,
    'DescribeIsvErrorLogsNumber'
  )(vars)

  return result
}
