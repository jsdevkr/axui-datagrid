import { fromJS } from 'immutable';
import assignWith from 'lodash-es/assignWith';

/**
 * @method
 * @param _columns
 * @param _options
 * @return {{rows: Array}}
 */
export function makeHeaderTable( _columns, _options ) {
  const columns = fromJS( _columns ).toJS();
  let table = {
    rows: []
  };
  let colIndex = 0;

  function makeRows( _columns: iAXDataGridColumns[], depth: number, parentField?: any ): number {
    let row = { cols: [] };
    let i = 0
    let l = _columns.length
    let colspan = 1;

    for ( ; i < l; i++ ) {
      let field = _columns[ i ];
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

        if ( 'columns' in field ) {
          colspan = makeRows( field.columns, depth + 1, field );
        } else {
          field.width = ('width' in field) ? field.width : _options.columnMinWidth;
        }
        field.colspan = colspan;

        row.cols.push( field ); // 복제된 필드 삽입
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
  }

  makeRows( columns, 0 );

  // set rowspan
  table.rows.forEach( ( row, ri ) => {
    row.cols.forEach( ( col ) => {
      if ( !('columns' in col) ) {
        col.rowspan = table.rows.length - ri;
      }
    } );
  } );

  return table;
}

/**
 * @method
 * @param _columns
 * @param _options
 * @return {{rows: Array}}
 */
export function makeBodyRowTable( _columns, _options ) {
  const columns = fromJS( _columns ).toJS();
  let table = {
    rows: []
  };
  let colIndex = 0;

  const makeRows = function ( _columns: any, depth: number, parentField?: any ): number {
    let row = { cols: [] };
    let i = 0;
    let l = _columns.length;
    let colspan = 1;

    const selfMakeRow = function ( __columns: any, __depth: number ): void {
      let i = 0;
      let l = __columns.length;

      for ( ; i < l; i++ ) {
        let field   = __columns[ i ],
            colspan = 1;

        if ( !field.hidden ) {

          if ( 'key' in field ) {
            field.colspan = 1;
            field.rowspan = 1;
            field.depth = __depth;

            field.rowIndex = __depth;
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
              colspan = makeRows( field.columns, __depth + 1, field );
            }
            field.colspan = colspan;
          }
          else {
            if ( 'columns' in field ) {
              selfMakeRow( field.columns, __depth );
            }
          }
        }
        else {

        }
      }
    };

    for ( ; i < l; i++ ) {
      let field = _columns[ i ];
      colspan = 1;

      if ( !field.hidden ) {

        if ( 'key' in field ) {

          field.colspan = 1;
          field.rowspan = 1;
          field.depth = depth;

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
            colspan = makeRows( field.columns, depth + 1, field );
          }
          field.colspan = colspan;

        } else {
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

  makeRows( columns, 0 );

  // set rowspan
  table.rows.forEach( ( row, ri ) => {
    row.cols.forEach( ( col ) => {
      if ( !('columns' in col) ) {
        col.rowspan = table.rows.length - ri;
      }
    } );
  } );

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
    for ( let c = addC; c < colGroup.length; c++ ) {
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


/**
 * @method
 * @param _table
 * @param _frozenColumnIndex
 * @param options
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
