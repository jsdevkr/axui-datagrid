import { IDataGrid } from '../common/@types';

function getPositionPrintColGroup(
  _headerColGroup: IDataGrid.ICol[] = [],
  sx: number,
  ex: number,
) {
  let printStartColIndex: number = 0,
    printEndColIndex: number = _headerColGroup.length - 1;
  for (let ci = 0, cl = _headerColGroup.length; ci < cl; ci++) {
    if (
      (_headerColGroup[ci]._sx as number) <= sx &&
      (_headerColGroup[ci]._ex as number) >= sx
    ) {
      printStartColIndex = ci;
    }
    if (
      (_headerColGroup[ci]._sx as number) <= ex &&
      (_headerColGroup[ci]._ex as number) >= ex
    ) {
      printEndColIndex = ci;
      break;
    }
  }
  return { printStartColIndex, printEndColIndex };
}

export default getPositionPrintColGroup;
