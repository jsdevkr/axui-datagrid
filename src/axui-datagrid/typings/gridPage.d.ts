interface iAXDataGridPageProps {
  mounted: boolean;
  styles: iAXDataGridStyle;
  pageButtonsContainerWidth: number;
  pageButtons: iAXDataGridOptionPageButton[];
  pageButtonHeight: number;
  onClickPageButton: Function;
}

interface iAXDataGridPageState {
  /* empty */
}
