import { createService } from '@alicloud/xconsole'

const PRODUCT = 'consolebench';

export default async (variables) => {
  const result = await createService(
    PRODUCT,
    'ListPagedDeployment'
  )(variables)

  result.haveDeployingItem = false;

  if (result.data && result.data.length > 0) {
    result.data.forEach((item) => {
      // todo 需要增加检查逻辑
      item.continue = '0'

      if (item.status === 0 || item.status === 1) {
        result.haveDeployingItem = true;
      }

      const details = item.details || [];
      const firstBatch = {
        completed: 0,
        other: 0,
      };
      const secondBatch = {
        completed: 0,
        other: 0,
      };
      details.forEach((detail) => {
        if (detail.batchNo === 1) {
          if (detail.status === 2) {
            firstBatch.completed += 1;
          } else {
            firstBatch.other += 1;
          }
        }
        if (detail.batchNo === 2) {
          if (detail.status === 2) {
            secondBatch.completed += 1;
          } else {
            secondBatch.other += 1;
          }
        }
      });
      if (firstBatch.completed !== 0 && firstBatch.other === 0) {
        item.continue = '1';
      }
    })
  }
  console.log('result', result);

  return result;
}
