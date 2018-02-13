
interface iAXDataGridHeaderProps {
  getRootBounding: Function;
  mounted: boolean;
  optionsHeader: iAXDataGridOptionHeader;
  styles: iAXDataGridStyle;
  frozenColumnIndex: number;
  colGroup: any;
  asideColGroup: any;
  leftHeaderColGroup: any;
  headerColGroup: any;
  asideHeaderData: any;
  leftHeaderData: any;
  headerData: any;
  scrollLeft: number;
  selectionCols: any;
  focusedCol: number;
  sortInfo: any;
  onResizeColumnResizer: Function;
  onClickHeader: Function;
}

interface iAXDataGridHeaderState {
  columnResizing: boolean;
  columnResizerLeft: number;
}

interface iAXDataGridHeaderPanelProps {
  panelName: string;
  colGroup: any;
  bodyRow: any;
  style: {
    width?: number;
    height: number;
    left?: number;
  };
  optionsHeader: iAXDataGridOptionHeader;
  focusedCol: number;
  selectionCols: object;
  onClickHeader: Function;
  sortInfo: any;
  onMouseDownColumnResizer: Function;
}

interface iAXDataGridHeaderPanelState {

}
