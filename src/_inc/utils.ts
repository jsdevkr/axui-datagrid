import { List, Map } from 'immutable';

import assignWith from 'lodash-es/assignWith';
import each from 'lodash-es/each';
import isArray from 'lodash-es/isArray';
import isElement from 'lodash-es/isElement';
import isNumber from 'lodash-es/isNumber';
import isFunction from 'lodash-es/isFunction';
import isObject from 'lodash-es/isObject';
import isString from 'lodash-es/isString';


let WEEKNAMES = [
  { label: 'SUN' },
  { label: 'MON' },
  { label: 'TUE' },
  { label: 'WED' },
  { label: 'THU' },
  { label: 'FRI' },
  { label: 'SAT' }
];

function times( s, count ) {
  return count < 1 ? '' : new Array( count + 1 ).join( s );
}

function setDigit( num, length, padder?: any, radix?: any ) {
  let s = num.toString( radix || 10 );
  return times( (padder || '0'), (length - s.length) ) + s;
}

function right( str, pos ) {
  if ( typeof str === 'undefined' || typeof pos === 'undefined' ) return '';
  str = '' + str;
  if ( isString( pos ) ) {
    return (str.lastIndexOf( pos ) > -1) ? str.substr( str.lastIndexOf( pos ) + 1 ) : '';
  }
  else if ( isNumber( pos ) ) {
    return str.substr( str.length - pos );
  }
  else {
    return '';
  }
}

export function localDate( yy, mm, dd, hh?: number, mi?: number, ss?: number ) {
  let utcD;
  if ( mm < 0 ) mm = 0;
  if ( typeof hh === 'undefined' ) hh = 12;
  if ( typeof mi === 'undefined' ) mi = 0;

  utcD = new Date( Date.UTC( yy, mm, dd || 1, hh, mi, ss || 0 ) );

  if ( mm == 0 && dd == 1 && utcD.getUTCHours() + (utcD.getTimezoneOffset() / 60) < 0 ) {
    utcD.setUTCHours( 0 );
  }
  else {
    utcD.setUTCHours( utcD.getUTCHours() + (utcD.getTimezoneOffset() / 60) );
  }
  return utcD;
}

export function cdate( d, cond ) {
  let yy, mm, dd, hh, mi,
      aDateTime, aTimes, aTime, aDate,
      va,
      ISO_8601      = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i,
      ISO_8601_FULL = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;

  if ( isString( d ) ) {
    if ( d.length === 0 ) {
      d = new Date();
    }
    else if ( d.length > 15 ) {
      if ( ISO_8601_FULL.test( d ) || ISO_8601.test( d ) ) {
        d = new Date( d );
      } else {
        aDateTime = d.split( / /g ), aTimes, aTime,
          aDate = aDateTime[ 0 ].split( /\D/g ),
          yy = aDate[ 0 ];
        mm = parseFloat( aDate[ 1 ] );
        dd = parseFloat( aDate[ 2 ] );
        aTime = aDateTime[ 1 ] || '09:00';
        aTimes = aTime.substring( 0, 5 ).split( ':' );
        hh = parseFloat( aTimes[ 0 ] );
        mi = parseFloat( aTimes[ 1 ] );
        if ( right( aTime, 2 ) === 'AM' || right( aTime, 2 ) === 'PM' ) hh += 12;
        d = localDate( yy, mm - 1, dd, hh, mi );
      }
    }
    else if ( d.length == 14 ) {
      va = d.replace( /\D/g, '' );
      d = localDate( va.substr( 0, 4 ), va.substr( 4, 2 ) - 1, parseFloat( va.substr( 6, 2 ) ), parseFloat( va.substr( 8, 2 ) ), parseFloat( va.substr( 10, 2 ) ), parseFloat( va.substr( 12, 2 ) ) );
    }
    else if ( d.length > 7 ) {
      va = d.replace( /\D/g, '' );
      d = localDate( va.substr( 0, 4 ), va.substr( 4, 2 ) - 1, parseFloat( va.substr( 6, 2 ) ) );
    }
    else if ( d.length > 4 ) {
      va = d.replace( /\D/g, '' );
      d = localDate( va.substr( 0, 4 ), va.substr( 4, 2 ) - 1, 1 );
    }
    else if ( d.length > 2 ) {
      va = d.replace( /\D/g, '' );
      d = localDate( va.substr( 0, 4 ), va.substr( 4, 2 ) - 1, 1 );
    }
    else {
      d = new Date();
    }
  }
  if ( typeof cond === 'undefined' || typeof d === 'undefined' ) {
    return d;
  }
  else {
    if ( 'return' in cond ) {
      return (function () {

        let fStr = cond[ 'return' ], nY, nM, nD, nH, nMM, nS, nDW,
            yre, regY, mre, regM, dre, regD, hre, regH, mire, regMI, sre, regS, dwre, regDW;

        nY = d.getUTCFullYear();
        nM = setDigit( d.getMonth() + 1, 2 );
        nD = setDigit( d.getDate(), 2 );
        nH = setDigit( d.getHours(), 2 );
        nMM = setDigit( d.getMinutes(), 2 );
        nS = setDigit( d.getSeconds(), 2 );
        nDW = d.getDay();

        yre = /[^y]*(yyyy)[^y]*/gi;
        yre.exec( fStr );
        regY = RegExp.$1;
        mre = /[^m]*(MM)[^m]*/g;
        mre.exec( fStr );
        regM = RegExp.$1;
        dre = /[^d]*(dd)[^d]*/gi;
        dre.exec( fStr );
        regD = RegExp.$1;
        hre = /[^h]*(hh)[^h]*/gi;
        hre.exec( fStr );
        regH = RegExp.$1;
        mire = /[^m]*(mm)[^i]*/g;
        mire.exec( fStr );
        regMI = RegExp.$1;
        sre = /[^s]*(ss)[^s]*/gi;
        sre.exec( fStr );
        regS = RegExp.$1;
        dwre = /[^d]*(dw)[^w]*/gi;
        dwre.exec( fStr );
        regDW = RegExp.$1;

        if ( regY === 'yyyy' ) {
          fStr = fStr.replace( regY, right( nY, regY.length ) );
        }
        if ( regM === 'MM' ) {
          if ( regM.length == 1 ) nM = (d.getMonth() + 1);
          fStr = fStr.replace( regM, nM );
        }
        if ( regD === 'dd' ) {
          if ( regD.length == 1 ) nD = d.getDate();
          fStr = fStr.replace( regD, nD );
        }
        if ( regH === 'hh' ) {
          fStr = fStr.replace( regH, nH );
        }
        if ( regMI === 'mm' ) {
          fStr = fStr.replace( regMI, nMM );
        }
        if ( regS === 'ss' ) {
          fStr = fStr.replace( regS, nS );
        }
        if ( regDW == 'dw' ) {
          fStr = fStr.replace( regDW, WEEKNAMES[ nDW ].label );
        }
        return fStr;
      })();
    }
    else {
      return d;
    }
  }
}

/**
 * _target의 조상중에 원하는 조건의 엘리먼트가 있는지 검사합니다. 있을 때는 해당 엘리먼트를 반환하고 없으면 false를 반환 합니다
 * Checks the parent of the target for elements of the desired condition. Returns the element if the element with the desired condition exists, otherwise returns false.
 * @param _target
 * @param _predicate
 * @return {boolean|Element}
 * @example
 * ```js
 * let downedElement = UTIL.findParentNodeByAttr(ee.target, (element) => {
 *  return element.getAttribute('data-column-filter') === 'true';
 * });
 * // false | Element
 * ```
 */
export function findParentNodeByAttr( _target, _predicate ) {
  if ( _target ) {
    while ( (function () {
      let result = true;
      if ( typeof _predicate === 'undefined' ) {
        _target = (_target.parentNode) ? _target.parentNode : false;
      }
      else if ( isFunction( _predicate ) && isElement( _target ) ) {
        result = _predicate( _target );
      }
      return !result;
    })() ) {
      if ( _target.parentNode && _target.parentNode.parentNode ) {
        _target = _target.parentNode;
      }
      else {
        _target = false;
        break;
      }
    }
  }
  return _target;
}

/**
 * @method
 * @param _table
 * @param _frozenColumnIndex
 * @return {{leftData: {rows: Array}, rightData: {rows: Array}}}
 */
export function divideTableByFrozenColumnIndex( _table, _frozenColumnIndex, options ) {

  let asideTable      = { rows: [] },
      asideColGroup   = [],
      asidePanelWidth = 0,
      tempTable_l     = { rows: [] },
      tempTable_r     = { rows: [] };

  for ( let i = 0, l = _table.rows.length; i < l; i++ ) {
    asideTable.rows[ i ] = { cols: [] };
    if ( i === 0 ) {
      let col = {
        label: '',
        colspan: 1,
        rowspan: _table.rows.length,
        rowIndex: 0,
        colIndex: -1
      }, _col = {};

      if ( options.showLineNumber ) {
        _col = assignWith( {}, col, {
          width: options.lineNumberColumnWidth,
          _width: options.lineNumberColumnWidth,
          align: 'center',
          columnAttr: 'lineNumber',
          key: '__line_number__',
          label: ''
        } );
        asideColGroup.push( _col );
        asideTable.rows[ i ].cols.push( _col );

        asidePanelWidth += options.lineNumberColumnWidth;
      }
      if ( options.showRowSelector ) {
        _col = assignWith( {}, col, {
          width: options.rowSelectorColumnWidth,
          _width: options.rowSelectorColumnWidth,
          align: 'center',
          columnAttr: 'rowSelector',
          key: '__row_selector__', label: ''
        } );
        asideColGroup.push( _col );
        asideTable.rows[ i ].cols.push( _col );

        asidePanelWidth += options.rowSelectorColumnWidth;
      }
    }
  }

  for ( let r = 0, rl = _table.rows.length; r < rl; r++ ) {
    let row = _table.rows[ r ];

    tempTable_l.rows[ r ] = { cols: [] };
    tempTable_r.rows[ r ] = { cols: [] };

    for ( let c = 0, cl = row.cols.length; c < cl; c++ ) {
      let col           = row.cols[ c ],
          colStartIndex = col.colIndex,
          colEndIndex   = col.colIndex + col.colspan;

      if ( colStartIndex < _frozenColumnIndex ) {
        if ( colEndIndex <= _frozenColumnIndex ) {
          // 좌측편에 변형없이 추가
          tempTable_l.rows[ r ].cols.push( col );
        } else {
          let leftCol  = assignWith( {}, col ),
              rightCol = assignWith( {}, leftCol );

          leftCol.colspan = _frozenColumnIndex - leftCol.colIndex;
          // rightCol.colIndex = _frozenColumnIndex;
          rightCol.colspan = col.colspan - leftCol.colspan;

          tempTable_l.rows[ r ].cols.push( leftCol );
          if ( rightCol.colspan ) {
            tempTable_r.rows[ r ].cols.push( rightCol );
          }
        }
      }
      else {
        // 오른편
        //tempTable_r.rows[r].cols.push(Object.assign({}, col, {colIndex: col.colIndex - _frozenColumnIndex}));
        tempTable_r.rows[ r ].cols.push( assignWith( {}, col, {} ) );
      }

      col = null;
      colStartIndex = null;
      colEndIndex = null;
    }

    row = null;
  }

  // frozenPanelWidth는 컬럼의 너비 _width가 결정된 후에 구해야 함으로 여기서 처리 하지 않는다
  // _width는 컬럼의 너비가 '*' 또는 '%'일 때에 컨테이너의 너비에 따라 상대적으로 결정된다.
  return {
    asideData: asideTable,
    asideColGroup: asideColGroup,
    asidePanelWidth: asidePanelWidth,
    leftData: tempTable_l,
    rightData: tempTable_r
  }
}

/**
 * @method
 * @param _table
 * @param _startColumnIndex
 * @param _endColumnIndex
 * @return {{rows: Array}}
 */
export function getTableByStartEndColumnIndex( _table, _startColumnIndex, _endColumnIndex ) {
  let tempTable = { rows: [] };

  if ( 'rows' in _table ) {
    _table.rows.forEach( ( row, r ) => {
      tempTable.rows[ r ] = { cols: [] };
      for ( let c = 0, cl = row.cols.length; c < cl; c++ ) {
        let col = assignWith( {}, row.cols[ c ] );
        let colStartIndex = col.colIndex;
        let colEndIndex = col.colIndex + col.colspan;

        if ( _startColumnIndex <= colStartIndex || colEndIndex <= _endColumnIndex ) {
          if ( _startColumnIndex <= colStartIndex && colEndIndex <= _endColumnIndex ) {
            // 변형없이 추가
            tempTable.rows[ r ].cols.push( col );
          }
          else if ( _startColumnIndex > colStartIndex && colEndIndex > _startColumnIndex ) {
            // 앞에서 걸친경우
            col.colspan = colEndIndex - _startColumnIndex;
            tempTable.rows[ r ].cols.push( col );
          }
          else if ( colEndIndex > _endColumnIndex && colStartIndex <= _endColumnIndex ) {
            tempTable.rows[ r ].cols.push( col );
          }
        }
      }
    } );
  }
  return tempTable;
}

/**
 *
 * @param e
 * @return {{clientX, clientY}}
 */
export function getMousePosition( e ) {
  let mouseObj = ('changedTouches' in e && e.changedTouches) ? e.changedTouches[ 0 ] : e;
  // clientX, Y 쓰면 스크롤에서 문제 발생
  return {
    x: mouseObj.clientX,
    y: mouseObj.clientY
  }
}

/**
 * @method
 * @param _columns
 * @param _options
 * @return {{rows: Array}}
 */
export function makeHeaderTable( _columns, _options ) {
  let columns  = List( _columns ),
      table    = {
        rows: []
      },
      colIndex = 0;

  // todo immutable array
  const maekRows = function ( _columns: any, depth: number, parentField?: any ) {
    let row = { cols: [] };
    let i = 0, l = _columns.size;
    let colspan = 1;

    for ( ; i < l; i++ ) {
      let field = _columns.get( i );
      colspan = 1;

      if ( !field.hidden ) {
        field.colspan = 1;
        field.rowspan = 1;

        field.rowIndex = depth;
        field.colIndex = (function () {
          if ( !parentField ) {
            return colIndex++;
          } else {
            colIndex = parentField.colIndex + i + 1;
            return parentField.colIndex + i;
          }
        })();

        row.cols.push( field ); // 복제된 필드 삽입

        if ( 'columns' in field ) {
          colspan = maekRows( field.columns, depth + 1, field );
        } else {
          field.width = ('width' in field) ? field.width : _options.columnMinWidth;
        }
        field.colspan = colspan;
      } else {


      }
    }

    if ( row.cols.length > 0 ) {
      if ( !table.rows[ depth ] ) {
        table.rows[ depth ] = { cols: [] };
      }
      table.rows[ depth ].cols = table.rows[ depth ].cols.concat( row.cols );
      return (row.cols.length - 1) + colspan;
    } else {
      return colspan;
    }

  };

  maekRows( columns, 0, undefined );

  // set rowspan
  for ( let r = 0, rl = table.rows.length; r < rl; r++ ) {
    for ( let c = 0, cl = table.rows[ r ].cols.length; c < cl; c++ ) {
      if ( !('columns' in table.rows[ r ].cols[ c ]) ) {
        table.rows[ r ].cols[ c ].rowspan = rl - r;
      }
    }
  }

  return table;
}

/**
 * @method
 * @param _columns
 * @param _options
 * @return {{rows: Array}}
 */
export function makeBodyRowTable( _columns, _options ) {
  let columns = List( _columns );
  let table = {
    rows: []
  };
  let colIndex = 0;

  const maekRows = function ( _columns: any, depth: number, parentField?: any ) {
    let row = { cols: [] };
    let i = 0;
    let l = _columns.size;
    let colspan = 1;

    const selfMakeRow = function ( __columns: any, __depth: number ) {
      let i = 0;
      let l = __columns.length;

      for ( ; i < l; i++ ) {
        let field   = __columns,
            colspan = 1;

        if ( !field.hidden ) {

          if ( 'key' in field ) {
            field.colspan = 1;
            field.rowspan = 1;

            field.rowIndex = depth;
            field.colIndex = (function () {
              if ( !parentField ) {
                return colIndex++;
              } else {
                colIndex = parentField.colIndex + i + 1;
                return parentField.colIndex + i;
              }
            })();

            row.cols.push( field );
            if ( 'columns' in field ) {
              colspan = maekRows( field.columns, depth + 1, field );
            }
            field.colspan = colspan;
          }
          else {
            if ( 'columns' in field ) {
              selfMakeRow( field.columns, depth );
            }
          }
        }
        else {

        }
      }
    };

    for ( ; i < l; i++ ) {
      let field = _columns.get( i );
      colspan = 1;

      if ( !field.hidden ) {

        if ( 'key' in field ) {
          field.colspan = 1;
          field.rowspan = 1;

          field.rowIndex = depth;
          field.colIndex = (function () {
            if ( !parentField ) {
              return colIndex++;
            } else {
              colIndex = parentField.colIndex + i + 1;
              return parentField.colIndex + i;
            }
          })();

          row.cols.push( field );
          if ( 'columns' in field ) {
            colspan = maekRows( field.columns, depth + 1, field );
          }
          field.colspan = colspan;
        }
        else {
          if ( 'columns' in field ) {
            selfMakeRow( field.columns, depth );
          }
        }
      }
      else {

      }

      field = null;
    }

    if ( row.cols.length > 0 ) {
      if ( !table.rows[ depth ] ) {
        table.rows[ depth ] = { cols: [] };
      }
      table.rows[ depth ].cols = table.rows[ depth ].cols.concat( row.cols );
      return (row.cols.length - 1) + colspan;
    }
    else {
      return colspan;
    }
  };

  maekRows( columns, 0 );

  {
    // set rowspan
    for ( let r = 0, rl = table.rows.length; r < rl; r++ ) {
      let row = table.rows[ r ];
      for ( let c = 0, cl = row.cols.length; c < cl; c++ ) {
        let col = row.cols[ c ];
        if ( !('columns' in col) ) {
          col.rowspan = rl - r;
        }
        col = null;
      }
      row = null;
    }
  }

  return table;
}

/**
 * @method
 * @param _table
 * @param _options
 * @return {{}}
 */
export function makeBodyRowMap( _table, _options ) {
  let map = {};
  _table.rows.forEach( function ( row ) {
    row.cols.forEach( function ( col ) {
      map[ col.rowIndex + '_' + col.colIndex ] = assignWith( {}, col );
    } );
  } );
  return map;
}

/**
 * @method
 * @param _footSumColumns
 * @param colGroup
 * @param options
 * @return {{rows: Array}}
 */
export function makeFootSumTable( _footSumColumns, colGroup, options ) {
  let table = {
    rows: []
  };

  for ( let r = 0, rl = _footSumColumns.length; r < rl; r++ ) {
    let footSumRow = _footSumColumns[ r ],
        addC       = 0;

    table.rows[ r ] = { cols: [] };

    for ( let c = 0, cl = footSumRow.length; c < cl; c++ ) {
      if ( addC > colGroup.length ) break;
      let colspan = footSumRow[ c ].colspan || 1;
      if ( footSumRow[ c ].label || footSumRow[ c ].key ) {
        table.rows[ r ].cols.push( {
          colspan: colspan,
          rowspan: 1,
          colIndex: addC,
          columnAttr: 'sum',
          align: footSumRow[ c ].align,
          label: footSumRow[ c ].label,
          key: footSumRow[ c ].key,
          collector: footSumRow[ c ].collector,
          formatter: footSumRow[ c ].formatter
        } );
      } else {
        table.rows[ r ].cols.push( {
          colIndex: addC,
          colspan: colspan,
          rowspan: 1,
          label: '&nbsp;',
        } );
      }
      addC += colspan;
      colspan = null;
    }

    if ( addC < colGroup.length ) {
      for ( let c = addC; c < colGroup.length; c++ ) {
        table.rows[ r ].cols.push( {
          colIndex: (c),
          colspan: 1,
          rowspan: 1,
          label: '&nbsp;',
        } );
      }
    }
    footSumRow = null;
    addC = null;
  }

  return table;
}


export function makeBodyGroupingTable( _bodyGroupingColumns, colGroup, options ) {
  let table = {
        rows: []
      },
      r     = 0,
      addC  = 0;

  table.rows[ r ] = { cols: [] };

  for ( let c = 0, cl = _bodyGroupingColumns.length; c < cl; c++ ) {
    if ( addC > options.columns.length ) break;
    let colspan = _bodyGroupingColumns[ c ].colspan || 1;
    if ( _bodyGroupingColumns[ c ].label || _bodyGroupingColumns[ c ].key ) {
      table.rows[ r ].cols.push( {
        colspan: colspan,
        rowspan: 1,
        rowIndex: 0,
        colIndex: addC,
        columnAttr: 'default',
        align: _bodyGroupingColumns[ c ].align,
        label: _bodyGroupingColumns[ c ].label,
        key: _bodyGroupingColumns[ c ].key,
        collector: _bodyGroupingColumns[ c ].collector,
        formatter: _bodyGroupingColumns[ c ].formatter
      } );
    } else {
      table.rows[ r ].cols.push( {
        rowIndex: 0,
        colIndex: addC,
        colspan: colspan,
        rowspan: 1,
        label: '&nbsp;'
      } );
    }
    addC += colspan;
  }

  if ( addC < colGroup.length ) {
    for ( var c = addC; c < colGroup.length; c++ ) {
      table.rows[ r ].cols.push( {
        rowIndex: 0,
        colIndex: (c),
        colspan: 1,
        rowspan: 1,
        label: '&nbsp;',
      } );
    }
  }

  return table;
}

export function findPanelByColumnIndex( _dindex, _colIndex, _rowIndex ) {
  let _containerPanelName,
      _isScrollPanel = false,
      _panels        = [];

  if ( this.xvar.frozenRowIndex > _dindex ) _panels.push( 'top' );
  if ( this.xvar.frozenColumnIndex > _colIndex ) _panels.push( 'left' );
  _panels.push( 'body' );

  if ( this.xvar.frozenColumnIndex <= _colIndex || this.xvar.frozenRowIndex <= _dindex ) {
    _containerPanelName = _panels.join( '-' );
    _panels.push( 'scroll' );
    _isScrollPanel = true;
  }

  return {
    panelName: _panels.join( '-' ),
    containerPanelName: _containerPanelName,
    isScrollPanel: _isScrollPanel
  }
}

export function getRealPathForDataItem( _dataPath ) {
  let path  = [],
      _path = [].concat( _dataPath.split( /[\.\[\]]/g ) );

  _path.forEach( function ( n ) {
    if ( n !== '' ) path.push( '[\"' + n.replace( /['\"]/g, '' ) + '\"]' );
  } );
  _path = null;
  return path.join( '' );
}

/**
 * @method
 * @param data
 * @return {{receivedList: Array, page: {}}}
 */
export function propsConverterForData( data ) {
  let Obj_return = {
    receivedList: [],
    page: false
  };

  if ( isArray( data ) ) {
    Obj_return.receivedList = data;
  }
  else if ( isObject( data ) ) {
    Obj_return.receivedList = data.list || [];
    Obj_return.page = data.page || {};
  }

  return Obj_return;
}

/**
 * 그리드 colGroup의 width 값을 처리 하는 함수. 왜? '*', '%'로 된 값은 상대적인 값이기 때문에. 컨테이너의 너비에 따라 재계산이 필요합니다.
 * @method
 * @param _colGroup
 * @param options
 * @param container
 * @return {any}
 */
export function setColGroupWidth( _colGroup, container, options ) {
  let totalWidth = 0, computedWidth, autoWidthColGroupIndexs = [], i, l;

  _colGroup.forEach( ( col, ci ) => {
    if ( isNumber( col.width ) ) {
      totalWidth += col._width = col.width;
    } else if ( col.width === '*' ) {
      autoWidthColGroupIndexs.push( ci );
    } else if ( col.width.substring( col.width.length - 1 ) === '%' ) {
      totalWidth += col._width = container.width * col.width.substring( 0, col.width.length - 1 ) / 100;
    }
  } );

  if ( autoWidthColGroupIndexs.length > 0 ) {
    computedWidth = (container.width - totalWidth) / autoWidthColGroupIndexs.length;
    for ( i = 0, l = autoWidthColGroupIndexs.length; i < l; i++ ) {
      _colGroup.update( autoWidthColGroupIndexs[ i ], O => {
        O._width = (computedWidth < options.columnMinWidth) ? options.columnMinWidth : computedWidth;
        return O;
      } );
    }
  }
  // 컬럼의 시작위치와 끝위치 계산

  for ( i = 0; i < _colGroup.length; i++ ) {
    if ( i === 0 ) {
      _colGroup[ i ]._sx = 0;
    } else {
      _colGroup[ i ]._sx = _colGroup[ i - 1 ]._ex;
    }
    _colGroup[ i ]._ex = _colGroup[ i ]._sx + _colGroup[ i ]._width;
  }

  return _colGroup;
}

/**
 *
 * @param element
 * @return {number}
 */
export function getInnerWidth( element: any ): number {
  const cs = window.getComputedStyle( element );
  return element.offsetWidth - (parseFloat( cs.paddingLeft ) + parseFloat( cs.paddingRight ) + parseFloat( cs.borderLeftWidth ) + parseFloat( cs.borderRightWidth ));
}

/**
 *
 * @param element
 * @return {number}
 */
export function getInnerHeight( element: any ): number {
  const cs = window.getComputedStyle( element );
  return element.offsetHeight - (parseFloat( cs.paddingTop ) + parseFloat( cs.paddingBottom ) + parseFloat( cs.borderTopWidth ) + parseFloat( cs.borderBottomWidth ));
}

/**
 *
 * @param element
 * @return {number}
 */
export function getOuterWidth( element: any ): number {
  return element.offsetWidth;
}

/**
 *
 * @param element
 * @return {number}
 */
export function getOuterHeight( element: any ): number {
  return element.offsetHeight;
}

/**
 *
 * @param state
 * @param action
 * @param [options=state.get('options').toJS()]
 * @param [styles=state.get('styles').toJS()]
 * @return {{styles: (any | *)}}
 */
export function calculateDimensions( containerDOM, storeState, state, colGroup = state.colGroup, options = state.options, styles = Map( state.styles ).toJS() ) {
  let list = storeState.list;
  let footSumColumns = state.footSumColumns;
  let headerTable = state.headerTable;

  styles.calculatedHeight = null; // props에의해 정해진 height가 아닌 내부에서 계산된 높이를 사용하고 싶은 경우 숫자로 값 지정

  styles.elWidth = getOuterWidth( containerDOM );
  styles.elHeight = getOuterHeight( containerDOM );

  styles.CTInnerWidth = styles.elWidth;
  styles.CTInnerHeight = styles.elHeight;
  styles.rightPanelWidth = 0;

  colGroup = setColGroupWidth( colGroup, { width: styles.elWidth - (styles.asidePanelWidth + options.scroller.size) }, options );

  styles.frozenPanelWidth = (( colGroup, endIndex ) => {
    let width = 0;
    for ( let i = 0, l = endIndex; i < l; i++ ) {
      width += colGroup[ i ]._width;
    }
    return width;
  })( colGroup, options.frozenColumnIndex );
  styles.headerHeight = (options.header.display) ? headerTable.rows.length * options.header.columnHeight : 0;

  styles.frozenPanelHeight = options.frozenRowIndex * styles.bodyTrHeight;

  styles.footSumHeight = footSumColumns.length * styles.bodyTrHeight;
  styles.pageHeight = options.page.height;
  styles.pageButtonsContainerWidth = options.page.buttonsContainerWidth;

  styles.verticalScrollerWidth = ((styles.elHeight - styles.headerHeight - styles.pageHeight - styles.footSumHeight) < list.size * styles.bodyTrHeight) ? options.scroller.size : 0;
  styles.horizontalScrollerHeight = (() => {
    let totalColGroupWidth = colGroup.reduce( ( prev, curr ) => {
      return (prev._width || prev) + curr._width
    } );

    // aside 빼고, 수직 스크롤이 있으면 또 빼고 비교
    let bodyWidth = styles.elWidth - styles.asidePanelWidth - styles.verticalScrollerWidth;
    return (totalColGroupWidth > bodyWidth) ? options.scroller.size : 0;
  })();

  styles.scrollContentWidth = state.headerColGroup.reduce( ( prev, curr ) => {
    return (prev._width || prev) + curr._width
  } );

  styles.scrollContentContainerWidth = styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth - styles.verticalScrollerWidth;

  if ( styles.horizontalScrollerHeight > 0 ) {
    styles.verticalScrollerWidth = ((styles.elHeight - styles.headerHeight - styles.pageHeight - styles.footSumHeight - styles.horizontalScrollerHeight) < list.size * styles.bodyTrHeight) ? options.scroller.size : 0;
  }

  // 수평 너비 결정
  styles.CTInnerWidth = styles.elWidth;
  // 수직 스크롤러의 높이 결정.
  styles.CTInnerHeight = styles.elHeight - styles.pageHeight;
  // get bodyHeight
  styles.bodyHeight = styles.CTInnerHeight - styles.headerHeight;
  // 스크롤컨텐츠의 컨테이너 높이.
  styles.scrollContentContainerHeight = styles.bodyHeight - styles.frozenPanelHeight - styles.footSumHeight;
  styles.scrollContentHeight = styles.bodyTrHeight * (list.size > options.frozenRowIndex ? list.size - options.frozenRowIndex : 0);

  if ( options.scroller.disabledVerticalScroll ) {
    styles.calculatedHeight = list.size * styles.bodyTrHeight + styles.headerHeight + styles.pageHeight;
    styles.bodyHeight = styles.calculatedHeight - styles.headerHeight - styles.pageHeight;
    styles.verticalScrollerWidth = 0;
    styles.CTInnerWidth = styles.elWidth;
    styles.scrollContentContainerWidth = styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth;
    styles.scrollContentContainerHeight = styles.scrollContentHeight;
  } else {

  }

  styles.verticalScrollerHeight = styles.elHeight - styles.pageHeight - options.scroller.padding * 2 - options.scroller.arrowSize;
  styles.horizontalScrollerWidth = styles.elWidth - styles.verticalScrollerWidth - styles.pageButtonsContainerWidth - options.scroller.padding * 2 - options.scroller.arrowSize;
  styles.scrollerPadding = options.scroller.padding;
  styles.scrollerArrowSize = options.scroller.arrowSize;
  styles.verticalScrollBarHeight = (styles.scrollContentHeight) ? styles.scrollContentContainerHeight * styles.verticalScrollerHeight / styles.scrollContentHeight : 0;
  if ( options.scroller.barMinSize > styles.verticalScrollBarHeight ) {
    styles.verticalScrollBarHeight = options.scroller.barMinSize;
  }
  styles.horizontalScrollBarWidth = (styles.scrollContentWidth) ? styles.scrollContentContainerWidth * styles.horizontalScrollerWidth / styles.scrollContentWidth : 0;
  if ( options.scroller.barMinSize > styles.horizontalScrollBarWidth ) {
    styles.horizontalScrollBarWidth = options.scroller.barMinSize;
  }


  return {
    styles: styles,
    colGroup: colGroup,
    leftHeaderColGroup: colGroup.slice( 0, options.frozenColumnIndex ),
    headerColGroup: colGroup.slice( options.frozenColumnIndex )
  }
}

/**
 *
 * @param scrollLeft
 * @param scrollTop
 * @param scrollWidth
 * @param scrollHeight
 * @param clientWidth
 * @param clientHeight
 * @return {{scrollLeft: *, scrollTop: *, eventBreak: boolean}}
 */
export function getScrollPosition( scrollLeft: number, scrollTop: number, { scrollWidth, scrollHeight, clientWidth, clientHeight } ) {
  let endScroll = false;

  if ( clientHeight > scrollHeight ) {
    scrollTop = 0;
  }
  else if ( scrollTop > 0 ) {
    scrollTop = 0;
    endScroll = true;
  } else if ( clientHeight > scrollHeight + scrollTop ) {
    // scrollHeight
    scrollTop = clientHeight - scrollHeight;
    endScroll = true;
  }

  if ( clientWidth > scrollWidth ) {
    scrollLeft = 0;
  }
  else if ( scrollLeft > 0 ) {
    scrollLeft = 0;
    endScroll = true;
  } else if ( clientWidth > scrollWidth + scrollLeft ) {
    // scrollHeight
    scrollLeft = clientWidth - scrollWidth;
    endScroll = true;
  }

  return {
    scrollLeft, scrollTop, endScroll
  }
}

/**
 *
 * @param {number} scrollBarLeft
 * @param {number} scrollBarTop
 * @param {any} horizontalScrollerWidth
 * @param {any} verticalScrollerHeight
 * @param {any} horizontalScrollBarWidth
 * @param {any} verticalScrollBarHeight
 * @param {any} scrollContentWidth
 * @param {any} scrollContentHeight
 * @param {any} scrollContentContainerWidth
 * @param {any} scrollContentContainerHeight
 * @param {any} BW
 * @param {any} BH
 * @param {any} SW
 * @param {any} SH
 * @return {{scrollLeft: number; scrollTop: number}}
 */
export function getScrollPositionByScrollBar( scrollBarLeft: number, scrollBarTop: number, {
  horizontalScrollerWidth, verticalScrollerHeight, horizontalScrollBarWidth, verticalScrollBarHeight,
  scrollContentWidth, scrollContentHeight,
  scrollContentContainerWidth, scrollContentContainerHeight,
  BW = horizontalScrollerWidth - horizontalScrollBarWidth,
  BH = verticalScrollerHeight - verticalScrollBarHeight,
  SW = scrollContentWidth - scrollContentContainerWidth,
  SH = scrollContentHeight - scrollContentContainerHeight
} ) {

  let { scrollLeft, scrollTop } = getScrollPosition( -scrollBarLeft * SW / BW, -scrollBarTop * SH / BH, {
    scrollWidth: scrollContentWidth,
    scrollHeight: scrollContentHeight,
    clientWidth: scrollContentContainerWidth,
    clientHeight: scrollContentContainerHeight
  } );

  return {
    scrollLeft,
    scrollTop
  }
}

export function getSelectedCellByMousePosition( { x: sx, y: sy }, { x: ex, y: ey } ) {
  return [];
}


export function propsToState( props, state ) {
  let dividedObj;

  // state 계산영역 시작
  state.headerTable = makeHeaderTable( props.columns, state.options );
  state.bodyRowTable = makeBodyRowTable( props.columns, state.options );
  state.bodyRowMap = makeBodyRowMap( state.bodyRowTable, state.options );

  dividedObj = divideTableByFrozenColumnIndex( state.headerTable, state.options.frozenColumnIndex, state.options );
  state.asideHeaderData = dividedObj.asideData;
  state.asideColGroup = dividedObj.asideColGroup; // asideColGroup은 header, bodyRow 에서 공통으로 사용 한번만 구하면 그만이지만 편의상 header에서 처리하기로 한다.
  state.leftHeaderData = dividedObj.leftData;
  state.headerData = dividedObj.rightData;
  state.styles.asidePanelWidth = dividedObj.asidePanelWidth;

  dividedObj = divideTableByFrozenColumnIndex( state.bodyRowTable, state.options.frozenColumnIndex, state.options );
  state.asideBodyRowData = dividedObj.asideData;
  state.leftBodyRowData = dividedObj.leftData;
  state.bodyRowData = dividedObj.rightData;

  // 한줄의 높이 계산 (한줄이 여러줄로 구성되었다면 높이를 늘려야 하니까);
  state.styles.bodyTrHeight = state.bodyRowTable.rows.length * state.options.body.columnHeight;

  state.colGroupMap = {};

  state.headerTable.rows.forEach( ( row, r ) => {
    row.cols.forEach( ( col, c ) => {
      state.colGroupMap[ col.colIndex ] = assignWith( {}, col );
    } );
  } );

  state.colGroup = [];
  each( state.colGroupMap, ( v, k ) => {
    state.colGroup.push( v );
  } );

  state.leftHeaderColGroup = state.colGroup.slice( 0, state.options.frozenColumnIndex );
  state.headerColGroup = state.colGroup.slice( state.options.frozenColumnIndex );

  // footSum
  state.footSumColumns = [];
  state.footSumTable = {};

  if ( isArray( state.options.footSum ) ) {
    state.footSumColumns = state.options.footSum;
    state.footSumTable = makeFootSumTable( state.footSumColumns, state.colGroup, state.options );
    dividedObj = divideTableByFrozenColumnIndex( state.footSumTable, state.options.frozenColumnIndex, state.options );
    state.leftFootSumData = dividedObj.leftData;
    state.footSumData = dividedObj.rightData;
  }

  // grouping info
  if ( state.options.body.grouping ) {
    if ( 'by' in state.options.body.grouping && 'columns' in state.options.body.grouping ) {
      state.bodyGrouping = {
        by: state.options.body.grouping.by,
        columns: state.options.body.grouping.columns
      };
      state.bodyGroupingTable = makeBodyGroupingTable( state.bodyGrouping.columns, state.colGroup, state.options );
      state.sortInfo = (() => {
        let sortInfo = {};
        for ( let k = 0, kl = state.bodyGrouping.by.length; k < kl; k++ ) {
          sortInfo[ state.bodyGrouping.by[ k ] ] = {
            orderBy: 'asc',
            seq: k,
            fixed: true
          };
          for ( let c = 0, cl = state.colGroup.length; c < cl; c++ ) {
            if ( state.colGroup[ c ].key === state.bodyGrouping.by[ k ] ) {
              state.colGroup[ c ].sort = 'asc';
              state.colGroup[ c ].sortFixed = true;
            }
          }
        }
        return sortInfo;
      })();

      dividedObj = divideTableByFrozenColumnIndex( state.bodyGroupingTable, state.options.frozenColumnIndex, state.options );
      state.asideBodyGroupingData = dividedObj.asideData;
      state.leftBodyGroupingData = dividedObj.leftData;
      state.bodyGroupingData = dividedObj.rightData;
      state.bodyGroupingMap = makeBodyRowMap( state.bodyGroupingTable, state.options );
    } else {
      state.options.body.grouping = false;
    }
  }

  return state;
}


