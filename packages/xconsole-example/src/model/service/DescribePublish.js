/**
 * 分页获取迭代列表
 */

import { createService } from '@alicloud/xconsole'

const PRODUCT = 'consolebench';

export default async (variables) => {
  const vars = Object.assign({}, {
    IterationPublishId: 1,
    IterationId: 1,
  })
  const result = await createService(
    PRODUCT,
    'DescribePublish'
  )(vars)

  return result
}
