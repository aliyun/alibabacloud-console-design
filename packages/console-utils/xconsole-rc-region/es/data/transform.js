import _typeof from "@babel/runtime/helpers/esm/typeof";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import find from 'lodash/find';
import groupBy from 'lodash/groupBy';
import values from 'lodash/values';

var formatRegion = function formatRegion(region) {
  var name = region.name,
      showName = region.showName,
      ordering = region.ordering,
      district = region.district;
  return {
    id: name,
    name: showName,
    ordering: ordering,
    district: district
  };
};

var formatDistrict = function formatDistrict(district) {
  var districtId = district.districtId,
      showName = district.showName,
      ordering = district.ordering;
  return {
    id: districtId,
    name: showName,
    ordering: ordering
  };
};

var sortByOrdering = function sortByOrdering(a, b) {
  return a.ordering - b.ordering;
};

var sortCollection = function sortCollection(collection) {
  return collection.sort(sortByOrdering);
};

export var union = function union(origin, input) {
  return origin.map(function (originItem) {
    var formattedItem = formatRegion(originItem);
    var id = formattedItem.id;
    var inputRecord = find(input, {
      id: id
    });
    var disabled = !inputRecord;

    var _ref = inputRecord || {},
        endpoint = _ref.endpoint;

    return _objectSpread({}, formattedItem, {
      disabled: disabled,
      endpoint: endpoint
    });
  }).sort(sortByOrdering);
};
export var intersection = function intersection(origin, input) {
  return union(origin, input).filter(function (region) {
    return !region.disabled;
  });
};
export var groupByDistrict = function groupByDistrict(collection) {
  return groupBy(collection, 'district.districtId');
};
var fixedFirstColumn = 'asia-pacific';

var getDistrictFromCollection = function getDistrictFromCollection(collection) {
  if (!collection || !collection.length) {
    return {};
  }

  return collection[0].district || {};
};

var mapCollectionToDescriptor = function mapCollectionToDescriptor(collection) {
  var district = getDistrictFromCollection(collection);
  var formattedDistrict = formatDistrict(district);
  var sortedCollection = sortCollection(collection);
  return _objectSpread({}, formattedDistrict, {
    list: sortedCollection
  });
};

var generateColumnData = function generateColumnData(collections) {
  return sortCollection(collections.map(mapCollectionToDescriptor));
};

export var seperateToColumns = function seperateToColumns(collection) {
  var _groupByDistrict = groupByDistrict(collection),
      fixedColumn = _groupByDistrict[fixedFirstColumn],
      restColumnMap = _objectWithoutProperties(_groupByDistrict, [fixedFirstColumn].map(_toPropertyKey));

  var result = [];

  if (fixedColumn && fixedColumn.length > 0) {
    result.push(generateColumnData([fixedColumn]));
  }

  if (restColumnMap) {
    var restColumnValues = values(restColumnMap);

    if (restColumnValues && restColumnValues.length) {
      result.push(generateColumnData(restColumnValues));
    }
  }

  return result;
};