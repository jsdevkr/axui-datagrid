declare module '*.json' {
  const value: any;
  export default value;
}
declare module '*.png' {
  const value: any;
  export default value;
}
declare module '*.jpg' {
  const value: any;
  export default value;
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

interface iFormatterData {
  list: any;
  item: any;
  index: number;
  key: string;
  value: any;
  options: any;
}
