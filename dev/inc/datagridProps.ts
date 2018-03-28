import {
  each,
  isBoolean,
  isFunction,
  isNumber,
  isObject,
  isString,
} from 'lodash';
import { gridOptions } from 'axui-datagrid/_inc/defaults';
import optionDesc from './optionDesc';

interface iDatagridProps {
  name: string;
  defaultValue?: any;
  type: string;
  description?: string;
  required?: boolean;

  [propName: string]: any;
}

let datagridProps: iDatagridProps[] = [
  {
    name: 'height',
    defaultValue: "'300px'",
    type: 'string',
    description: 'height of datagrid',
    required: false,
  },
  {
    name: 'style',
    defaultValue: '',
    type: 'object',
    description: '',
    required: false,
  },
  {
    name: 'columns',
    defaultValue: '',
    type: 'array',
    description: '',
    required: true,
  },
  {
    name: 'columns[].key',
    defaultValue: '',
    type: 'string',
    description: '',
    required: true,
  },
  {
    name: 'columns[].width',
    defaultValue: '100',
    type: 'number',
    description: '',
    required: false,
  },
  {
    name: 'columns[].label',
    defaultValue: '',
    type: 'string',
    description: '',
    required: true,
  },
  {
    name: 'columns[].align',
    defaultValue: 'left',
    type: 'string',
    enums: ['left', 'center', 'right'],
    description: '',
    required: false,
  },
  {
    name: 'columns[].formatter',
    defaultValue: '',
    type: 'function|string',
    enums: ['money'],
    description: '',
    required: false,
  },
  {
    name: 'data',
    defaultValue: '',
    type: 'arrayOf',
    description: '',
    required: false,
  },
  {
    name: 'options',
    defaultValue: '',
    type: 'object',
    description: '',
    required: false,
  },
  {
    name: 'onBeforeEvent',
    defaultValue: 'undefined',
    type: 'Function',
    description: '',
    required: false,
  },
  {
    name: 'onAfterEvent',
    defaultValue: 'undefined',
    type: 'Function',
    description: '',
    required: false,
  },
];

//console.log(gridOptions);

function parseOption(prefix: string, options: any) {
  each(options, (value, key) => {
    if (isString(value)) {
      datagridProps.push({
        name: prefix + key,
        defaultValue: value,
        type: 'string',
        description: optionDesc[prefix + key] || '',
      });
    } else if (isNumber(value)) {
      datagridProps.push({
        name: prefix + key,
        defaultValue: value,
        type: 'number',
        description: optionDesc[prefix + key] || '',
      });
    } else if (isBoolean(value)) {
      datagridProps.push({
        name: prefix + key,
        defaultValue: '' + value,
        type: 'boolean',
        description: optionDesc[prefix + key] || '',
      });
    } else if (isObject(value)) {
      datagridProps.push({
        name: prefix + key,
        defaultValue: '',
        type: 'object',
        description: optionDesc[prefix + key] || '',
      });
      parseOption(prefix + key + '.', value);
    } else if (isFunction(value)) {
      datagridProps.push({
        name: prefix + key,
        defaultValue: '',
        type: 'function',
        description: optionDesc[prefix + key] || '',
      });
    }
  });
}

parseOption('options.', gridOptions);

export { datagridProps };
