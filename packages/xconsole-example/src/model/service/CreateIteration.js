import { createService } from '@alicloud/xconsole'

const PRODUCT = 'consolebench';

export default async (variables) => {
  const vars = Object.assign({}, {
    Name: 'test iteration name',
    Description: 'test iteration description',
    Branch: 'fuck/1.2.3',
    AppId: variables.app,
  })
  const result = await createService(
    PRODUCT,
    'CreateIteration'
  )(vars)

  result.packItemCount = 0;

  if (result.data && result.data.length > 0) {
    result.data.forEach((item) => {
      if (item.status === 0 || item.status === 1) {
        result.packItemCount += 1;
      }
    })
  }
  return result
}
