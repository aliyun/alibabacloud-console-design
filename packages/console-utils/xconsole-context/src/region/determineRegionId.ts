import isArray from 'lodash/isArray';

import { getActiveId } from './cookies';
import type { IPayloadRegion } from '../types/ConsoleBase';

const getIdFromItem = (item: IPayloadRegion): string => {
  return item.id;
};

/**
 * 计算准确的 regionId
 * @param id 期望 regionId
 * @param currentActiveId 当前 regionId
 * @param dataSourceRaw 有效 region 列表
 * @param defaultRegionId 默认兜底 regionId
 * @returns
 */
export const determineRegionId = (
  id: string,
  currentActiveId: string,
  dataSourceRaw: IPayloadRegion[],
  defaultRegionId?: string,
): string => {
  // currentActiveId 一般情况下由调用者从 context 进行获取.
  // 一般情况下, 这个值与 getActiveId 函数返回的结果是一致的.
  // 没有调用者从 context 中获取失败, 或调用者明确不为该参数赋值,
  // 则使用 getActiveId 从 cookie 中取值进行兜底, 尽量让该值保持一个有效的状态.
  // 只有在用户第一次访问控制台时, 该值可能为空
  const exactCurrentActiveId = currentActiveId || getActiveId();

  // 对 dataSource 进行预处理, 如果不符合期望, 则直接返回当前的 activeId
  // 之所以没有返回用户声明的 id, 是因为用户的输入无法进行预测,
  // 返回当前 activeId 是最保险的做法
  if (!isArray(dataSourceRaw) || !dataSourceRaw.length) {
    return exactCurrentActiveId;
  }

  // 过滤掉置灰的 region
  const dataSource = dataSourceRaw.filter((d) => !d.disabled);

  // 如果用户未声明传入的id, 则使用当前的 defaultRegionId 和 activeId 进行填充并进行后续的比较过程
  const expectedActiveId = id || defaultRegionId || exactCurrentActiveId;

  // 如果上面的执行过程仍未获取到任何有效符合期望的结果,
  // 则使用 dataSource 中的第一个数据项中的 id 作为结果返回
  if (!expectedActiveId) {
    return getIdFromItem(dataSource[0]);
  }

  let isValidDefaultRegionId = false;
  let isValidCurrentActiveId = false;

  // eslint-disable-next-line no-restricted-syntax
  for (const item of dataSource) {
    const itemId = getIdFromItem(item);

    // 使用尽量短的循环将 id 与 region 列表中的每一项进行比较
    // 一旦命中匹配, 立即返回结果
    if (expectedActiveId === itemId) {
      return expectedActiveId;
    }

    // 判定当前的 defaultRegionId 是否在给定的集合内
    if (defaultRegionId === itemId) {
      isValidDefaultRegionId = true;
    }

    // 判定当前的 activeId 是否在给定的集合内
    if (exactCurrentActiveId === itemId) {
      isValidCurrentActiveId = true;
    }
  }

  // 没有命中任何匹配, 但是当前的 defaultRegionId 在集合内,
  // 则直接使用当前的 defaultRegionId 作为返回值
  if (isValidDefaultRegionId) {
    return defaultRegionId;
  }

  // 没有命中任何匹配, 但是当前的 activeId 在集合内,
  // 则直接使用当前的 activeId 作为返回值
  if (isValidCurrentActiveId) {
    return exactCurrentActiveId;
  }

  // 既没有命中任何匹配, 且当前的 defaultRegionId activeId 也不再集合内,
  // 则将集合中的第一个数据项的 id 作为返回值
  return getIdFromItem(dataSource[0]);
};
