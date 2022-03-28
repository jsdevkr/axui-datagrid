import { IDataGrid } from '../common/@types';

export interface IGetFilteredListParam {
  colGroup: IDataGrid.ICol[];
  filter?: {
    colIndex: number;
    info: Record<string, any>;
  };
  sorter?: Record<string, any>;
  options?: IDataGrid.IOptions;
}
export default function getFilteredList(
  data: any[],
  { colGroup, filter, sorter, options }: IGetFilteredListParam,
) {
  const { columnKeys: optionColumnKeys = {} } = options || {};
  let filteredList: any[] = [];

  if (filter) {
    const { colIndex, info } = filter;
    const checkAll =
      info[colIndex] === false ? true : info[colIndex]._check_all_;

    if (checkAll) {
      filteredList =
        data &&
        data.filter((n: any) => {
          return (
            typeof n === 'undefined' ||
            !n[optionColumnKeys.deleted || '_deleted_']
          );
        });
    } else {
      filteredList = data.filter((n: any) => {
        if (n) {
          const value = n && n[colGroup[colIndex].key || ''];

          if (
            typeof n === 'undefined' ||
            n[optionColumnKeys.deleted || '_deleted_']
          ) {
            return false;
          }

          if (typeof value === 'undefined') {
            if (!info[colIndex]._UNDEFINED_) {
              return false;
            }
          } else {
            if (!info[colIndex][value]) {
              return false;
            }
          }

          return true;
        }
        return false;
      });
    }
  } else {
    filteredList = data.filter((n: any) => {
      return (
        typeof n === 'undefined' || !n[optionColumnKeys.deleted || '_deleted_']
      );
    });
  }

  // 정렬 오브젝트가 있다면 정렬 프로세스 적용하여 새로운 데이터 정렬
  if (sorter && Object.keys(sorter).length) {
    let sortInfoArray: any[] = [];
    for (let k in sorter) {
      if (sorter[k]) {
        sortInfoArray[sorter[k].seq] = {
          key: k,
          order: sorter[k].orderBy,
        };
      }
    }
    sortInfoArray = sortInfoArray.filter(o => typeof o !== 'undefined');

    let i = 0,
      l = sortInfoArray.length,
      aValue: any,
      bValue: any;

    const getValueByKey = function(_item: any, _key: string) {
      return _item[_key] || '';
    };
    filteredList = filteredList.sort(
      (a: any, b: any): any => {
        for (i = 0; i < l; i++) {
          aValue = getValueByKey(a, sortInfoArray[i].key);
          bValue = getValueByKey(b, sortInfoArray[i].key);

          if (typeof aValue !== typeof bValue) {
            aValue = '' + aValue;
            bValue = '' + bValue;
          }
          if (aValue < bValue) {
            return sortInfoArray[i].order === 'asc' ? -1 : 1;
          } else if (aValue > bValue) {
            return sortInfoArray[i].order === 'asc' ? 1 : -1;
          }
        }
      },
    );
  }

  return filteredList;
}
