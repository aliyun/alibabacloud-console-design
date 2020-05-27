import find from 'lodash/find'
import groupBy from 'lodash/groupBy'
import values from 'lodash/values'

const formatRegion = (region) => {
  const { name, showName, ordering, district } = region
  return {
    id: name,
    name: showName,
    ordering,
    district,
  }
}

const formatDistrict = (district) => {
  const { districtId, showName, ordering } = district
  return {
    id: districtId,
    name: showName,
    ordering,
  }
}

const sortByOrdering = (a, b) => (a.ordering - b.ordering)

const sortCollection = collection => collection.sort(sortByOrdering)

export const union = (origin, input) => origin.map((originItem) => {
  const formattedItem = formatRegion(originItem)
  const { id } = formattedItem
  const inputRecord = find(input, { id })
  const disabled = !inputRecord
  const { endpoint } = inputRecord || {}

  return {
    ...formattedItem,
    disabled,
    endpoint,
  }
}).sort(sortByOrdering)

export const intersection = (origin, input) => union(origin, input)
  .filter(region => !region.disabled)

export const groupByDistrict = collection => groupBy(
  collection,
  'district.districtId'
)

const fixedFirstColumn = 'asia-pacific'

const getDistrictFromCollection = (collection) => {
  if (!collection || !collection.length) {
    return {}
  }
  return collection[0].district || {}
}

const mapCollectionToDescriptor = (collection) => {
  const district = getDistrictFromCollection(collection)
  const formattedDistrict = formatDistrict(district)
  const sortedCollection = sortCollection(collection)
  return {
    ...formattedDistrict,
    list: sortedCollection,
  }
}

const generateColumnData = collections => sortCollection(
  collections.map(mapCollectionToDescriptor)
)

export const seperateToColumns = (collection) => {
  const {
    [fixedFirstColumn]: fixedColumn,
    ...restColumnMap
  } = groupByDistrict(collection)

  const result = []

  if (fixedColumn && fixedColumn.length > 0) {
    result.push(generateColumnData([fixedColumn]))
  }

  if (restColumnMap) {
    const restColumnValues = values(restColumnMap)
    if (restColumnValues && restColumnValues.length) {
      result.push(generateColumnData(restColumnValues))
    }
  }

  return result
}
