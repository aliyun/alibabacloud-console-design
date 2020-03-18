/**
 * 分页获取迭代列表
 */

import { createService } from '@alicloud/xconsole'

const PRODUCT = 'consolebench';

export default async (variables) => {
  console.log('debugme', PRODUCT,
    'ListPaged')
  const vars = Object.assign({}, {
    ProjectId: variables.project,
  })
  const result = await createService(
    PRODUCT,
    'ListPaged',
    {
      ignoreError: true,
    }
  )(vars)


  console.log('result', result);

  if (result.data && result.data.map) {
    result.data = result.data.map((item) => {
      item.appName = item.isvAppCode;
      item.title = item.name;
      return item;
    });
  }

  const feApps = await createService(
    PRODUCT,
    'DescribeApps',
    {
      ignoreError: true,
    }
  )(vars)

  if (feApps.data && feApps.data.map) {
    feApps.data = feApps.data.map((item) => {
      item.appName = item.id;
      item.isvAppCode = item.id;
      item.title = item.name;
      return item;
    });
  } else {
    feApps.data = [];
  }


  return {
    data: [].concat(result.data || [], feApps.data || []),
  }
}
