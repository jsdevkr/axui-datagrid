import { isNumber } from './common';
import { IDataGrid } from '../common/@types';

/**
 * 그리드 colGroup의 width 값을 처리 하는 함수. 왜? '*', '%'로 된 값은 상대적인 값이기 때문에. 컨테이너의 너비에 따라 재계산이 필요합니다.
 * @param {DataGridCol[]} colGroup
 * @param {DataGridRect} container
 * @param {DataGridOptions} options
 * @return {DataGridCol[]}
 */
function setColGroupWidth(
  colGroup: IDataGrid.ICol[],
  container: IDataGrid.IRect,
  options: IDataGrid.IOptions,
) {
  const { columnMinWidth = 0 } = options;
  let totalWidth = 0;
  let computedWidth: number;
  let autoWidthColGroupIndexes: number[] = [];
  let i: number;
  let l: number;

  colGroup.forEach((col, ci) => {
    if (isNumber(col.width)) {
      totalWidth += col._width = Number(col.width);
    } else if (col.width === '*') {
      autoWidthColGroupIndexes.push(ci);
    } else if (
      ('' + col.width).substring(('' + col.width).length - 1) === '%'
    ) {
      totalWidth += col._width =
        (container.width *
          Number(('' + col.width).substring(0, ('' + col.width).length - 1))) /
        100;
    }
  });

  if (autoWidthColGroupIndexes.length > 0) {
    computedWidth =
      (container.width - totalWidth) / autoWidthColGroupIndexes.length;
    for (i = 0, l = autoWidthColGroupIndexes.length; i < l; i++) {
      colGroup[autoWidthColGroupIndexes[i]]._width =
        computedWidth < columnMinWidth ? columnMinWidth : computedWidth;
    }
  }
  // 컬럼의 시작위치와 끝위치 계산

  for (i = 0; i < colGroup.length; i++) {
    if (i === 0) {
      colGroup[i]._sx = 0;
    } else {
      colGroup[i]._sx = colGroup[i - 1]._ex;
    }
    colGroup[i]._ex = (colGroup[i]._sx || 0) + (colGroup[i]._width || 0);
  }

  return colGroup;
}

export default setColGroupWidth;
