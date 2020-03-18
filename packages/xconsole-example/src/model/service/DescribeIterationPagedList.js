import { createService, ErrorPrompt } from '@alicloud/xconsole'

const PRODUCT = 'consolebench';

export default async (variables) => {
  let result = []
  try {
    result = await createService(
      PRODUCT,
      'DescribeIterationPagedList',
      {
        risk: {
          code: {
            forbidden: 'xxxxxx',
            doubleConfirm: 'FoundRiskAndDoubleConfirm',
          },
        },
      }
    )(variables)
  } catch (err) {
    console.log('debugme', err)
    ErrorPrompt(err, {
      errorConfig: {},
    });
    // result = err.response.data;
  }
  return result;
}
