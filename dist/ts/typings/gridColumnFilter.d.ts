
interface iAXDataGridColumnFilterOption {
  value: string;
  text: string;
  checked: boolean;
  checkAll?: boolean;
}

interface iAXDataGridColumnFilterProps {
  isColumnFilter: number | boolean;
  filterInfo: any;
  colGroup: any;
  options: any;
  frozenColumnIndex: number;
  scrollLeft: number;
  styles: iAXDataGridStyle;
  list: any;
  onChangeColumnFilter: Function;
}

interface iAXDataGridColumnFilterState {
}

interface iAXDataGridColumnFilterOptionProps {
  options: iAXDataGridColumnFilterOption[];
  onChange: Function;
}

interface iAXDataGridColumnFilterOptionState {
  mounted: boolean;
  scrollTop: number;
  clientHeight: number;
  scrollHeight: number;
  optionItemHeight: number;
}
