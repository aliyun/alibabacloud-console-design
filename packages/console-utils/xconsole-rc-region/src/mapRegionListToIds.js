/**
 * 将 region 列表映射为只包含 region id 的列表
 * @param {Array<String|Object>} list
 * @returns {Array<String>}
 */
const mapRegionListToIds = list => list.map((item) => {
  if (typeof item === 'string') {
    return item
  }
  return item.id
})

export default mapRegionListToIds
