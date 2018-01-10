let datagridProps = [
  {
    name: 'height',
    defaultValue: '\'300px\'',
    type: 'string',
    description: 'height of datagrid',
    required: false
  },
  {
    name: 'style',
    defaultValue: '',
    type: 'object',
    description: '',
    required: false
  },
  {
    name: 'columns',
    defaultValue: '',
    type: 'array',
    description: '',
    required: true
  },
  {
    name: 'columns[].key',
    defaultValue: '',
    type: 'string',
    description: '',
    required: true
  },
  {
    name: 'columns[].width',
    defaultValue: '100',
    type: 'number',
    description: '',
    required: false
  },
  {
    name: 'columns[].label',
    defaultValue: '',
    type: 'string',
    description: '',
    required: true
  },
  {
    name: 'columns[].align',
    defaultValue: 'left',
    type: 'string',
    enums: ['left', 'center', 'right'],
    description: '',
    required: false
  },
  {
    name: 'columns[].formatter',
    defaultValue: '',
    type: 'function|string',
    enums: ['money'],
    description: '',
    required: false
  },
  {
    name: 'data',
    defaultValue: '',
    type: 'arrayOf',
    description: '',
    required: false
  },
  {
    name: 'options',
    defaultValue: '',
    type: 'object',
    description: '',
    required: false
  }
];


export { datagridProps };