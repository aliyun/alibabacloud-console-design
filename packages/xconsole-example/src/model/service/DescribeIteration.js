/**
 * 获取迭代
 */

import { createService } from '@alicloud/xconsole'

const PRODUCT = 'consolebench';

export default async (variables) => {
  const vars = Object.assign({}, {
    Id: variables.iterationId,
  })
  const result = await createService(
    PRODUCT,
    'DescribeIteration',
    {
      ignoreError: true,
    }
  )(vars)

  return result
}
