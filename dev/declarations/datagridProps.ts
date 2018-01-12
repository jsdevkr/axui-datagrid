import each from 'lodash-es/each';
import isString from 'lodash-es/isString';
import isNumber from 'lodash-es/isNumber';
import isObject from 'lodash-es/isObject';
import isFunction from 'lodash-es/isFunction';
import isBoolean from 'lodash-es/isBoolean';
import { gridOptions } from '@src/_inc/defaults';

interface iDatagridProps {
  name: string;
  defaultValue?: any;
  type: string;
  description?: string;
  required?: boolean;

  [propName: string]: any
}

let datagridProps: [ iDatagridProps ] = [
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
    enums: [ 'left', 'center', 'right' ],
    description: '',
    required: false
  },
  {
    name: 'columns[].formatter',
    defaultValue: '',
    type: 'function|string',
    enums: [ 'money' ],
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

//console.log(gridOptions);

function parseOption( prefix: string, options: any ) {
  each( options, ( value, key ) => {
    if ( isString( value ) ) {
      datagridProps.push( {
        name: prefix + key,
        defaultValue: value,
        type: 'string'
      } )
    } else if ( isNumber( value ) ) {
      datagridProps.push( {
        name: prefix + key,
        defaultValue: value,
        type: 'number'
      } )
    } else if ( isBoolean( value ) ) {
      datagridProps.push( {
        name: prefix + key,
        defaultValue: '' + value,
        type: 'boolean'
      } )
    } else if ( isObject( value ) ) {
      datagridProps.push( {
        name: prefix + key,
        defaultValue: '',
        type: 'object'
      } );
      parseOption( prefix + key + '.', value );
    } else if ( isFunction( value ) ) {
      datagridProps.push( {
        name: prefix + key,
        defaultValue: '',
        type: 'function'
      } )
    }
  } );
}

parseOption( 'options.', gridOptions );


export { datagridProps };