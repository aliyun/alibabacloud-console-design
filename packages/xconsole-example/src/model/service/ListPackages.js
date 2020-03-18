import { createService } from '@alicloud/xconsole'

const PRODUCT = 'consolebench';

export default async (variables) => {
  const result = await createService(
    PRODUCT,
    'ListPackages'
  )(variables)

  const ret = [];

  if (result.data && result.data.length > 0) {
    result.data.forEach((item) => {
      ret.push(
        {
          ...item,
          id: item.id,
          name: item.ip || '',
          description: item.name || '',
          // TODO
          status: item.status,
          repoBranch: 'feat',
          version: '0.0.1',
          result: item.result || '',
          timeCreated: item.gmtCreate,
          timeModified: item.gmtModified,
          creator: {
            id: item.ownerId,
            name: '',
          },
          appId: item.isvAppCode,
        }
      )
    })
  }
  return result
}
