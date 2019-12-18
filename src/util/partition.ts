import { isArray, isFunction, isString, groupBy } from '@antv/util';
import simpleSortBy from './simple-sort-by';

export default (
  rows: any[],
  group_by: string | string[] | ((item: any) => string),
  order_by: string | string[] | ((item: any) => number) = []
): Record<string, any[]> => {
  let newRows = rows;
  if (order_by && order_by.length) {
    newRows = simpleSortBy(rows, order_by);
  }

  let groupingFn: (item: any) => string;

  if (isFunction(group_by)) {
    groupingFn = group_by;
  } else if (isArray(group_by)) {
    groupingFn = (row: any) => `_${group_by.map((col) => row[col]).join('-')}`;
    // NOTE: Object.keys({'b': 'b', '2': '2', '1': '1', 'a': 'a'}) => [ '1', '2', 'b', 'a' ]
    // that is why we have to add a prefix
  } else if (isString(group_by)) {
    groupingFn = (row: any) => `_${row[group_by]}`;
  }
  const groups = groupBy(newRows, groupingFn!);
  return groups;
};
