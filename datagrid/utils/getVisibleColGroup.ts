import { IDataGrid } from '../common/@types';
import getPositionPrintColGroup from './getPositionPrintColGroup';
import getTableByStartEndColumnIndex from './getTableByStartEndColumnIndex';

export interface IGetVisibleColGroupParam {
  scrollLeft?: number;
  bodyRowData?: IDataGrid.IColumnTableMap;
  footSumData?: IDataGrid.IColumnTableMap;
  styles?: IDataGrid.IStyles;
  options?: IDataGrid.IOptions;
}

export default function getVisibleColGroup(
  headerColGroup: IDataGrid.ICol[] = [],
  {
    scrollLeft = 0,
    bodyRowData = { rows: [{ cols: [] }] },
    footSumData = { rows: [{ cols: [] }] },
    styles = {},
    options = {},
  }: IGetVisibleColGroupParam,
) {
  const {
    elWidth = 0,
    frozenPanelWidth: FPWidth = 0,
    asidePanelWidth: APWidth = 0,
    rightPanelWidth: RPWidth = 0,
  } = styles;

  const { frozenColumnIndex = 0 } = options;

  const { printStartColIndex, printEndColIndex } = getPositionPrintColGroup(
    headerColGroup,
    Math.abs(scrollLeft || 0) + FPWidth,
    Math.abs(scrollLeft || 0) +
      FPWidth +
      (elWidth - APWidth - FPWidth - RPWidth),
  );
  const visibleHeaderColGroup = headerColGroup.slice(
    printStartColIndex,
    printEndColIndex + 1,
  );
  const visibleBodyRowData = getTableByStartEndColumnIndex(
    bodyRowData,
    printStartColIndex + frozenColumnIndex,
    printEndColIndex + frozenColumnIndex,
  );
  // const visibleBodyGroupingData = getTableByStartEndColumnIndex(
  //   storeState.bodyGroupingData,
  //   printStartColIndex + frozenColumnIndex,
  //   printEndColIndex + frozenColumnIndex,
  // ); todo : body grouping 구현후 주석을 풀자.
  const visibleFootSumData = getTableByStartEndColumnIndex(
    footSumData,
    printStartColIndex + frozenColumnIndex,
    printEndColIndex + frozenColumnIndex,
  );

  return {
    visibleHeaderColGroup,
    visibleBodyRowData,
    visibleFootSumData,
    printStartColIndex,
    printEndColIndex,
  };
}
