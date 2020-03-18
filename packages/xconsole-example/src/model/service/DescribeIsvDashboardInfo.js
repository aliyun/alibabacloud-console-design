/**
 * 分页获取迭代列表
 */

import { createService } from '@alicloud/xconsole'

const PRODUCT = 'consolebench';

export default async (variables) => {
  const vars = Object.assign({}, {
    commitId: 'COMMIT_ID_WHICH_SHALL_BE_RETRIEVED_IN_THE_BACKEND',
    OssUrl: 'oss://test',
    IterationId: 1,
  })

  const result = await createService(
    PRODUCT,
    'SlsUrl',
    {
      apiType: 'custom',
      method: 'post',
      url: '/isv/slsUrl.json',
      data: {
        sec_token: '',
        collina: '',
        umid: '',
        region: '',
      }
    }
  )(vars)

  return result
}
