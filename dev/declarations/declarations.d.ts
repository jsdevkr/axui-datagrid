declare module '*.json' {
  const value: any;
  export default value;
}

interface iSideNavProps {
  style: any;
}

interface iSideNavState {

}



interface iBasicDatagridProps {
}

interface iColumnEditor {
  type: string;
}

interface iColumns {
  key?: string;
  width?: number;
  label?: string;
  align?: string;
  formatter?: Function | string;
  editor?: Function | iColumnEditor;
  columns?: iColumns[];
}

interface iBasicDatagridState {
  height?: string,
  columns: iColumns[],
  data: any,
  options: object
}

interface iFormatterData {
  list: any;
  item: any;
  index: number;
  key: string;
  value: any;
  options: any;
}
